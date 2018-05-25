import { getAuthString } from '../auth';
import * as makeDebug from 'debug';
const debug = makeDebug('r6api:cmd:getLevel');
import fetcher from '../fetch';
import { URLS, Platform, UUID, isUuid } from '../constants';
import * as Errors from '../errors';

interface ILevel {
    profile_id: UUID;
    level: number;
}
interface INameApiResponse {
    player_profiles: ILevel[];
}

export default async function getLevel(platform: Platform, ids: string | string[]) {
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
            `${URLS[platform].LEVEL_URL}${_ids.join(',')}`,
            {},
            token,
        );
        if (res instanceof Error) {
            throw res;
        }
        return [].concat(res.player_profiles).map((profile: ILevel) => ({
            id: profile.profile_id,
            level: profile.level,
        }));
    }
}
