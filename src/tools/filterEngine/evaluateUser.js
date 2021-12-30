/* eslint-disable no-console */
import filteringConfig from '../../../filter.config';
import formatUser from './format-user';
import verifyField from './verify-field';
import renderProfile from '../renderProfile';

/**
 *
 * @param {object} user - profile object containing all the users' data.
 */
const evaluateUser = (user) => {
    const formattedUser = {
        name: user.name,
        age: user.age,
        profile_url: `https://badoo.com/people-nearby/${user.user_id}`,
        photo_urls: user.albums[0].photos.map((photoObj) => `https:${photoObj.large_url}`),
    };
    // Loop through config and format profile's key:value pairs to match those of config
    for (const [key, value] of Object.entries(filteringConfig)) {
        formatUser(key, value, formattedUser, user);
    }

    for (const [key, value] of Object.entries(filteringConfig)) {
        const accepted = verifyField(key, value, formattedUser);
        if (!accepted) {
            return;
        }
    }

    renderProfile(formattedUser);
    //console.log(user);
};

export default evaluateUser;
