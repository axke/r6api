import { getAuthString } from '../auth';
import * as makeDebug from 'debug';
const debug = makeDebug('r6api:cmd:getCurrentName');
import fetcher from '../fetch';
import { URLS, Platform, UUID, isUuid } from '../constants';
import * as Errors from '../errors';

interface IProfile {
    profileId: UUID;
    userId: UUID;
    nameOnPlatform: string;
}
interface INameApiResponse {
    profiles: IProfile[];
}

export default async function getCurrentName(platform: Platform, ids: string | string[]) {
    const _ids = [].concat(ids);
    if (_ids.some(id => !isUuid(id))) {
        throw new Error('passed id is not a valid UUID');
    }
    debug('called with ids %o', _ids);
    if (_ids.length > 40) {
        throw new Errors.TooManyIdsError('too many ids passed (max. 40)');
    } else {
        const token = await getAuthString();
        const res = await fetcher<INameApiResponse>(
            `${URLS[platform].REVERSE_URL}${_ids.join(',')}`,
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
