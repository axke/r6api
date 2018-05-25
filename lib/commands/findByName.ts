import { getAuthString } from '../auth';
import * as makeDebug from 'debug';
const debug = makeDebug('r6api:cmd:findByName');
import fetcher from '../fetch';
import { URLS, Platform, UUID } from '../constants';
import * as Errors from '../errors';

interface IProfile {
    profileId: UUID;
    userId: UUID;
    nameOnPlatform: string;
}
interface INameApiResponse {
    profiles: IProfile[];
}

export default async function findByName(platform: Platform, aliases: string | string[]) {
    const _aliases = [].concat(aliases);
    debug('called with ids %o', _aliases);
    if (_aliases.length > 40) {
        throw new Errors.TooManyIdsError('too many aliases passed (max. 40)');
    } else {
        const token = await getAuthString();
        const res = await fetcher<INameApiResponse>(
            `${URLS[platform].URL}${_aliases.join(',')}`,
            {},
            token,
        );
        if (res instanceof Error) {
            throw res;
        }
        return [].concat(res.profiles).map((profile: IProfile) => ({
            id: profile.profileId,
            userid: profile.userId,
            name: profile.nameOnPlatform,
        }));
    }
}
