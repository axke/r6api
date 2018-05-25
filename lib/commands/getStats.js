const { getAuthString } = require("../auth");
const debug = require("debug")("r6api:api");
const querystring = require("querystring");
const { TooManyIdsError } = require("../errors");
const { URLS, WEAPONTYPES, OPERATORS, STATS } = require("../constants");
const fetch = require("../fetch");

/**
 * helpers to map the response
 */
const operatorGetter = obj =>
    OPERATORS.reduce(function(acc, curr) {
        acc[curr.name] = {
            name: curr.readableName,
            kills: obj[`operatorpvp_kills:${curr.fullIndex}:infinite`],
            deaths: obj[`operatorpvp_death:${curr.fullIndex}:infinite`],
            won: obj[`operatorpvp_roundwon:${curr.fullIndex}:infinite`],
            lost: obj[`operatorpvp_roundlost:${curr.fullIndex}:infinite`],
            timePlayed: obj[`operatorpvp_timeplayed:${curr.fullIndex}:infinite`]
        };
        return acc;
    }, {});
const weaponGetter = obj =>
    Object.keys(WEAPONTYPES).reduce(function(acc, curr) {
        const val = WEAPONTYPES[curr];
        acc[val] = {
            kills: obj[`weapontypepvp_kills:${curr}:infinite`],
            headshot: obj[`weapontypepvp_headshot:${curr}:infinite`],
            bulletsFired: obj[`weapontypepvp_bulletfired:${curr}:infinite`],
            bulletsHit: obj[`weapontypepvp_bullethit:${curr}:infinite`]
        };
        return acc;
    }, {});

module.exports = function(platform, ids) {
    const query = [].concat(ids);
    if (query.length > 150) {
        return Promise.reject(new TooManyIdsError("too many ids passed (max 150)"));
    }
    debug("getStats for %O", query);
    return getAuthString()
        .then(
            fetch(
                `${URLS[platform].STATS_URL}statistics=${STATS.join(",")}&populations=${query.join(
                    ","
                )}`
            )
        )
        .then(res => res.results)
        .then(res => {
            //@TODO map res
            return Object.keys(res).reduce(
                (acc, curr) =>
                    acc.concat({
                        id: curr,
                        raw: res[curr],
                        weapon: weaponGetter(res[curr]),
                        operator: operatorGetter(res[curr]),
                        general: {
                            bulletsFired: res[curr]["generalpvp_bulletfired:infinite"],
                            bulletsHit: res[curr]["generalpvp_bullethit:infinite"],
                            headshot: res[curr]["generalpvp_headshot:infinite"],
                            deaths: res[curr]["generalpvp_death:infinite"],
                            assists: res[curr]["generalpvp_killassists:infinite"],
                            kills: res[curr]["generalpvp_kills:infinite"],
                            lost: res[curr]["generalpvp_matchlost:infinite"],
                            played: res[curr]["generalpvp_matchplayed:infinite"],
                            won: res[curr]["generalpvp_matchwon:infinite"],
                            meleeKills: res[curr]["generalpvp_meleekills:infinite"],
                            penetrationKills: res[curr]["generalpvp_penetrationkills:infinite"],
                            revives: res[curr]["generalpvp_revive:infinite"],
                            timePlayed: res[curr]["generalpvp_timeplayed:infinite"],
                            blindKills: res[curr]["generalpvp_blindkills:infinite"],
                            dbno: res[curr]["generalpvp_dbno:infinite"],
                            dbnoAssists: res[curr]["generalpvp_dbnoassists:infinite"],
                            gadgetsDestroyed: res[curr]["generalpvp_gadgetdestroy:infinite"],
                            hostageDefense: res[curr]["generalpvp_hostagedefense:infinite"],
                            hostageRescue: res[curr]["generalpvp_hostagerescue:infinite"],
                            rappelBreaches: res[curr]["generalpvp_rappelbreach:infinite"],
                            revivesDenied: res[curr]["generalpvp_revivedenied:infinite"],
                            serverAggression: res[curr]["generalpvp_serveraggression:infinite"],
                            serverDefender: res[curr]["generalpvp_serverdefender:infinite"],
                            serversHacked: res[curr]["generalpvp_servershacked:infinite"],
                            suicides: res[curr]["generalpvp_suicide:infinite"]
                        },
                        queue: {
                            casual: {
                                kills: res[curr]["casualpvp_kills:infinite"],
                                deaths: res[curr]["casualpvp_death:infinite"],
                                won: res[curr]["casualpvp_matchwon:infinite"],
                                lost: res[curr]["casualpvp_matchlost:infinite"],
                                played: res[curr]["casualpvp_matchplayed:infinite"],
                                timePlayed: res[curr]["casualpvp_timeplayed:infinite"]
                            },
                            ranked: {
                                kills: res[curr]["rankedpvp_kills:infinite"],
                                deaths: res[curr]["rankedpvp_death:infinite"],
                                won: res[curr]["rankedpvp_matchwon:infinite"],
                                lost: res[curr]["rankedpvp_matchlost:infinite"],
                                played: res[curr]["rankedpvp_matchplayed:infinite"],
                                timePlayed: res[curr]["rankedpvp_timeplayed:infinite"]
                            }
                        },
                        mode: {
                            bomb: {
                                won: res[curr]["plantbombpvp_matchwon:infinite"],
                                lost: res[curr]["plantbombpvp_matchlost:infinite"],
                                played: res[curr]["plantbombpvp_matchplayed:infinite"],
                                bestScore: res[curr]["plantbombpvp_bestscore:infinite"],
                                timePlayed: res[curr]["plantbombpvp_timeplayed:infinite"]
                            },
                            secure: {
                                won: res[curr]["secureareapvp_matchwon:infinite"],
                                lost: res[curr]["secureareapvp_matchlost:infinite"],
                                played: res[curr]["secureareapvp_matchplayed:infinite"],
                                bestScore: res[curr]["secureareapvp_bestscore:infinite"],
                                timePlayed: res[curr]["secureareapvp_timeplayed:infinite"]
                            },
                            hostage: {
                                won: res[curr]["rescuehostagepvp_matchwon:infinite"],
                                lost: res[curr]["rescuehostagepvp_matchlost:infinite"],
                                played: res[curr]["rescuehostagepvp_matchplayed:infinite"],
                                bestScore: res[curr]["rescuehostagepvp_bestscore:infinite"],
                                timePlayed: res[curr]["rescuehostagepvp_timeplayed:infinite"]
                            }
                        }
                    }),
                []
            );
        });
};
