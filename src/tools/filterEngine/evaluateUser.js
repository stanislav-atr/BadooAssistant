/* eslint-disable no-console */
import apiConfig from '../../../user-api.config';
import formatUser from './format-user';
import verifyField from './verify-field';

/**
 * 
 * @param {object} user - profile object containing all the users' data.
 */
const evaluateUser = (user) => {
    const formattedUser = {
        // id: user.user_id,
    };
    // Loop through config and format profile's key:value pairs to match those of config
    for (const [key, value] of Object.entries(apiConfig)) {
        formatUser(key, value, user, formattedUser);
    }

    for (const [key, value] of Object.entries(apiConfig)) {
        const accepted = verifyField(key, value, formattedUser);
        if (!accepted) {
            return;
        }
    }

    // console.img('https://itmediagroup.se/wp-content/uploads/2019/04/IMGSML.png');
    console.log(user.profile_fields[1].display_value);
    console.log(`https://badoo.com/people-nearby/${user.user_id}`);
    // console.log(formattedUser);
    console.log(user);
};

export default evaluateUser;
