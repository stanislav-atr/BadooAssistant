import apiConfig from '../../../user-api.config.js';
import formatUser from './format-user.js';
import verifyField from './verify-field';

/** TODO
 * Main *
 * Misc *
 */

/**
 * Proxy watchedUserflow object that indicates new profile and calls processing function on it.
 * @param {object} user - profile object containing all the users' data.
 * @param {array} passedUsers - array to store users that passed the evaluation.
 */
const evaluateUser = (user) => {
    let formattedUser = {
        // id: user.user_id,
    };
    // Loop through config and format corresponding profile's key:value pairs to match those of config
    for (const [key, value] of Object.entries(apiConfig)) {
        formatUser(key, value, user, formattedUser);
    }

    for (const [key, value] of Object.entries(apiConfig)) {
        let accepted;
        accepted = verifyField(key, value, formattedUser);
        if (!accepted) {
            return;
        }
    }

    console.log(user.profile_fields[1].display_value)
    console.log(`https://badoo.com/people-nearby/${user.user_id}`);
    //console.log(formattedUser);
    // console.log(user);
};

export default evaluateUser;