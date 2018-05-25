import * as makeDebug from 'debug';
const debug = makeDebug('r6api:auth');
import fetcher from './fetch';
import { URLS } from './constants';
import * as Errors from './errors';

export interface IUbiAuth {
    token: string;
    ticket: string;
    expiration: string;
}

let LOGIN_TIMEOUT: any;
let currentAuth: IUbiAuth | null = null;
const cred = {
    email: '',
    password: '',
};

/**
 * calls ubi login endpoint.
 * this function is not rate limited and should only be called internally
 * if you log in too often your account will get blocked by ubi
 *
 */
export async function login(email: string, pass: string) {
    cred.email = email;
    cred.password = pass;

    if (!cred.email || !cred.password) {
        throw new Errors.MissingCredentialsError();
    }

    if (currentAuth) {
        const expiration = new Date(currentAuth.expiration).getTime() - Date.now() - 10 * 60 * 1000;
        if (expiration > 0) {
            debug('Using existing token');
            LOGIN_TIMEOUT = setTimeout(login, expiration);
            return currentAuth;
        } else {
            debug('Old token expired');
        }
    }

    const token =
        'Basic ' + new Buffer(cred.email + ':' + cred.password, 'utf8').toString('base64');

    try {
        const res: IUbiAuth | Error = await fetcher<IUbiAuth>(
            URLS.PC.LOGIN_URL,
            {
                method: 'POST',
                body: JSON.stringify({ rememberMe: true }),
            },
            token,
        );
        if (res instanceof Error) {
            throw res;
        }

        if (res && res.ticket && res.expiration) {
            debug('new auth: expires %s', res.expiration);
            currentAuth = res;
            // get expiration timeout. (renew 10 minutes before expiry)
            const expiration = new Date(res.expiration).getTime() - Date.now() - 10 * 60 * 1000;
            // schedule token refresh
            currentAuth = res;
            LOGIN_TIMEOUT = setTimeout(login(cred.email, cred.password), expiration);
            return res;
        } else {
            throw new Errors.UnknownAuthError('auth error');
        }
    } catch (err) {
        debug('login failed: %o', err);
        clearTimeout(LOGIN_TIMEOUT);
        throw err;
    }
}

/** returns a valid token  */
async function getAuthToken(): Promise<string> {
    if (
        currentAuth &&
        currentAuth.expiration &&
        currentAuth.ticket &&
        new Date(currentAuth.expiration) > new Date()
    ) {
        return currentAuth.ticket;
    } else {
        // if not logged in, try to reauth with the last credentials
        await login(cred.email, cred.password);
        return currentAuth.ticket;
    }
}

/**
 * returns a Promise of a value for the Authorization header
 */
export async function getAuthString() {
    const token = await getAuthToken();
    return 'Ubi_v1 t=' + token;
}
