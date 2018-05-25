const debug = require("debug")("r6api:auth");
const fetch = require("./fetch");
const { URLS } = require("./constants");
const Errors = require("./errors");

const config = require("../config");
const delayAuth = config.delayAuth;

const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

let LOGIN_TIMEOUT;
let currentAuth = null;
const cred = {
    email: "",
    password: ""
};

let currentLogin;

/**
 * calls ubi login endpoint.
 * this function is not rate limited and should only be called internally
 *
 * @param {string} email account email
 * @param {string} pass account password
 * @returns {Promise} resolves with token
 */
async function login(email, pass, secondpass) {
    if (currentLogin) {
        return currentLogin;
    }
    if (email && pass) {
        setCredentials(email, pass);
    }

    if (!cred.email || !cred.password) {
        currentLogin = null;
        return Promise.reject(new Errors.MissingCredentialsError());
    }

    try {
        let auth = await fs.readFileAsync(config.tokenfile, "utf8");
        auth = JSON.parse(auth);
        const expiration = new Date(auth.expiration) - new Date() - 10 * 60 * 1000;
        if (expiration > 0) {
            debug("Using existing token");
            LOGIN_TIMEOUT = setTimeout(login, expiration);
            currentAuth = auth;
            currentLogin = null;
            return auth;
        }
        debug("Old token expired");
    } catch (e) {
        debug("No old token tempfile");
    }

    if (delayAuth && !secondpass) {
        return Promise.delay(60 * 1000).then(() => {
            return login(null, null, true);
        });
    }

    const token =
        "Basic " + new Buffer(cred.email + ":" + cred.password, "utf8").toString("base64");

    try {
        const res = await Promise.resolve(token).then(
            fetch(URLS.PC.LOGIN_URL, {
                method: "POST",
                body: JSON.stringify({ rememberMe: true })
            })
        );
        if (res && res.ticket && res.expiration) {
            debug("new auth: expires %s", res.expiration);
            currentAuth = res;
            // get expiration timeout. (renew 10 minutes before expiry)
            const expiration = new Date(res.expiration) - new Date() - 10 * 60 * 1000;
            // schedule token refresh
            currentLogin = false;
            LOGIN_TIMEOUT = setTimeout(() => {
                currentLogin = login();
            }, expiration);
            await fs.writeFileAsync(config.tokenfile, JSON.stringify(res));
            return res;
        } else {
            throw new Errors.UnknownAuthError();
        }
    } catch (err) {
        debug("login failed: %o", err);
        clearTimeout(LOGIN_TIMEOUT);
        currentLogin = false;
        await Promise.delay(5000);
        return Promise.reject(err);
    }
}

/** returns a valid token  */
function getAuthToken() {
    if (
        currentAuth &&
        currentAuth.expiration &&
        currentAuth.ticket &&
        new Date(currentAuth.expiration) > new Date()
    ) {
        return Promise.resolve(currentAuth.ticket);
    } else {
        currentLogin = login().then(() => currentAuth.ticket);
        return currentLogin;
    }
}

/**
 * returns a Promise of a value for the Authorization header
 */
function getAuthString() {
    return getAuthToken().then(token => "Ubi_v1 t=" + token);
}

function setCredentials(email, password) {
    cred.email = email;
    cred.password = password;
}

function getCredentials() {
    return cred;
}

function cancelRefresh() {
    clearTimeout(LOGIN_TIMEOUT);
}
function refreshScheduled() {
    return !!LOGIN_TIMEOUT;
}

function _setAuth(authObj) {
    currentAuth = authObj;
}
function _getAuth() {
    return currentAuth;
}
module.exports = {
    login,
    setCredentials,
    getCredentials,
    cancelRefresh,
    refreshScheduled,
    getAuthString,
    getAuthToken,
    _setAuth,
    _getAuth
};
