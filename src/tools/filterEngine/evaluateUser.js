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
        profile_url: `https://badoo.com/people-nearby/${user.user_id}`,
        avatar_url: 'https:' + user.albums[0].photos[0].large_url,
        photo_urls: [],
    };
    // Loop through config and format profile's key:value pairs to match those of config
    for (const [key, value] of Object.entries(filteringConfig)) {
        formatUser(key, value, user, formattedUser);
    }

    for (const [key, value] of Object.entries(filteringConfig)) {
        const accepted = verifyField(key, value, formattedUser);
        if (!accepted) {
            return;
        }
    }

    renderProfile(formattedUser);
    // console.log(user.profile_fields[1].display_value);
    // console.log(`https://badoo.com/people-nearby/${user.user_id}`);
    // console.log(formattedUser);
    // console.log(user);
};

export default evaluateUser;
