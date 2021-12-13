import browser from './browser-api.js';
import watchXHR from './tools/watchXHR';
import {
    userflowProxyEval,
    userflowProxyClick,
} from './tools/userflowProxy';

/** TODO
 * Main *
 * Implement autoscrolling + config value for it (keep scrolling until...)
 * captcha is a bitch, sometimes app crashes clearing console
 * Rework script initialization
 * Misc *
 * for prod include tampermonkey prefix into build
 * jsdoc all major functions
 * npmjs.com/package/bottleneck
 * Organize error throwing instead of silent and empty returns
 */

const getUserList = (responseObj) => {
    const tokensBatch = [];

    const sections = responseObj.body['0'].client_user_list.section;
    if (!sections) {
        throw 'There is no section!';
    }
    for (const section of sections) {
        const { users } = section;
        for (const user of users) {
            tokensBatch.push(user.user_id);
        }
    }
    return tokensBatch;
};

const manageRequests = (request) => {
    if (request.readyState !== 4) {
        return;
    }

    const { responseURL, responseText } = request;
    const responseObj = JSON.parse(responseText);

    if (responseURL.includes('SERVER_GET_USER_LIST')) {
        userflowProxyClick.flow = getUserList(responseObj);
        return;
    }

    if (responseURL.includes('SERVER_GET_USER') && !responseURL.includes('_LIST')) {
        const { user } = responseObj.body[0];
        // Filter out your own profile
        if (user.client_source && user.client_source === 0) {
            return;
        }
        userflowProxyEval.flow = user;
    }
};

const main = () => {
    console.log('Userscript started!');
    watchXHR(manageRequests);
    // setInterval(() => {
    //     const closeButton = browser.querySelector('.csms-modal > button[class*="--dark"]');
    //     if (closeButton) {
    //         console.log('HERE!!!!!!!!!');
    //         closeButton.click();
    //     }
    // }, 300);
};

export default main;
