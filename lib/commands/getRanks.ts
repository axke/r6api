import { getAuthString } from '../auth';
import * as makeDebug from 'debug';
import * as querystring from 'querystring';
const debug = makeDebug('r6api:cmd:getRanks');
import fetcher from '../fetch';
import { URLS, Platform, UUID, isUuid } from '../constants';
import * as Errors from '../errors';

type REGION = 'emea' | 'ncsa' | 'apac';
export interface IRank {
    region: string;
    board_id: string;
    past_seasons_abandons: number;
    update_time: string;
    skill_mean: number;
    abandons: number;
    season: number;
    profile_id: string;
    past_seasons_losses: number;
    max_mmr: number;
    mmr: number;
    wins: number;
    skill_stdev: number;
    rank: number;
    losses: number;
    next_rank_mmr: number;
    past_seasons_wins: number;
    previous_rank_mmr: number;
    max_rank: number;
}
interface IRankApiResponse {
    players: {
        [id: string]: IRank;
    };
}
export interface IPlayerRank {
    id: UUID;
    season: number;
    apac: IRank;
    emea: IRank;
    ncsa: IRank;
}
interface IRegionStats {
    [id: string]: IPlayerRank;
}

const regions = ['ncsa', 'emea', 'apac'];
const plucks = [
    'max_mmr',
    'skill_mean',
    'abandons',
    'region',
    'rank',
    'mmr',
    'wins',
    'skill_stdev',
    'losses',
    'max_rank',
];

export default async function getRanks(
    platform: Platform,
    ids: string | string[],
    season: number = -1,
) {
    const _ids = [].concat(ids);
    if (_ids.some(id => !isUuid(id))) {
        throw new Error('passed id is not a valid UUID');
    }

    if (_ids.length > 200) {
        throw new Errors.TooManyIdsError('too many ids passed (max. 200)');
    } else {
        const opts = {
            season_id: season,
            profile_ids: _ids.join(','),
        };
        debug('called with %O ', opts);

        const token = await getAuthString();
        const regionData = await Promise.all(
            regions.map(region => {
                const qs = Object.assign({}, opts, { region_id: region });
                return fetcher<IRankApiResponse>(
                    `${URLS[platform].RANK_URL}${querystring.stringify(qs)}`,
                    {},
                    token,
                );
            }),
        );

        if (regionData instanceof Error) {
            throw regionData;
        }
        const rankMap = regionData.reduce(
            function(acc: IRegionStats, regionData) {
                if (regionData instanceof Error) {
                    throw regionData;
                }
                Object.keys(regionData.players).forEach(id => {
                    const value = regionData.players[id];
                    if (acc[id] == null) {
                        acc[id] = { id, season: value.season } as any;
                    }
                    acc[id][value.region as REGION] = plucks.reduce(
                        (acc, curr) => {
                            acc[curr] = (value as any)[curr];
                            return acc;
                        },
                        {} as any,
                    );
                });
                return acc;
            },
            {} as IRegionStats,
        );

        return Object.keys(rankMap).map(id => rankMap[id]) as IPlayerRank[];
    }
}
