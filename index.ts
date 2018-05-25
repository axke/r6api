import { login } from './lib/auth';
import * as errors from './lib/errors';
//just re-export everything
import findByName from './lib/commands/findByName';
import getCurrentName from './lib/commands/getCurrentName';
import getLevel from './lib/commands/getLevel';
import getPlaytime from './lib/commands/getPlaytime';
import getRanks from './lib/commands/getPlaytime';

module.exports = {
    login,
    errors,
    api: {
        findByName,
        getCurrentName,
        getLevel,
        getPlaytime,
        getRanks,
    },
};
