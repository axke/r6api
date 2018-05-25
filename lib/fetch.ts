import * as initDebug from 'debug';
import nodeFetch from 'node-fetch';
import * as Errors from './errors';

const debug = initDebug('r6api:fetch');

interface IUbiError {
    httpCode: number;
    errorCode: number;
    message: string;
}

export default async function fetch<T>(
    url: string,
    params: any,
    token: string,
): Promise<T | Error> {
    const opts = Object.assign(
        {},
        {
            method: 'GET',
            headers: {
                'Ubi-AppId': '39baebad-39e5-4552-8c25-2c9b919064e2',
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: token,
            },
        },
        params || {},
    );
    opts.body ? debug('%s %s %O', opts.method, url, opts.body) : debug('%s %s', opts.method, url);
    const res = await nodeFetch(url, opts);
    const json = await res.json();
    debug('failed response: %O', res);
    if (res.status !== 200) {
        const r = json as IUbiError;
        switch (r.httpCode) {
            case 429:
                return new Errors.TooManyRequestsError();
            case 400:
                return new Errors.BadRequestError(r.message || r.errorCode.toString());
            default:
                break;
        }
        // after that the known error codes
        switch (r.errorCode) {
            case 1:
                return new Errors.MissingHeaderError(r.message);
            case 2:
                return new Errors.MissingCredentialsError();
            case 3:
                return new Errors.MissingHeaderError(r.message);
            case 3:
                return new Errors.InvalidCredentialsError();
            case 1101:
                return new Errors.TooManyRequestsError();
            case 1100:
                return new Errors.TooManyRequestsError();
            default:
                return new Errors.UnknownAuthError(r.message || r.errorCode.toString());
        }
    } else {
        return json as T;
    }
}
