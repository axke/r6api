const { getAuthString } = require("../auth");
const debug = require("debug")("r6api:api");
const { TooManyIdsError } = require("../errors");
const { URLS } = require("../constants");
const fetch = require("../fetch");

module.exports = function (platform, ids) {
    const query = [].concat(ids);
    if (query.length > 40)  {
        return Promise.reject(new TooManyIdsError("too many ids passed (max 40)"));
    }
    debug("getLevels for %o", query);
    return getAuthString()
        .then(fetch(`${URLS[platform].LEVEL_URL}${query.join(",")}`))
        .then(res => [].concat(res.player_profiles)
            .map(prof => ({
                id: prof.profile_id,
                level: prof.level
            })))
}