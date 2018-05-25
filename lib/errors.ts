export class InvalidCredentialsError extends Error {
    constructor() {
        super('invalid credentials');
    }
}
export class MissingCredentialsError extends Error {
    constructor() {
        super('missing credentials');
    }
}

export class TooManyRequestsError extends Error {
    constructor() {
        super('too many requests');
    }
}
export class UnknownAuthError extends Error {
    constructor(msg: string) {
        super(msg || 'unknown auth error');
    }
}
export class NoTokenError extends Error {
    constructor(msg: string) {
        super(msg || 'no token');
    }
}

export class MissingHeaderError extends Error {
    constructor(msg: string) {
        super(msg || 'missing header');
    }
}

export class TooManyIdsError extends Error {
    constructor(msg: string) {
        super(msg || 'too many ids');
    }
}

export class BadRequestError extends Error {
    constructor(msg: string) {
        super(msg || 'bad request');
    }
}
