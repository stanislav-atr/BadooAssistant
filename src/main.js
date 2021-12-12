import watchXHR from './tools/watchXHR';
import {
    userflowProxyEval,
    userflowProxyClick,
} from './tools/userflowProxy';

/** TODO
 * Main *
 * close last profile's modal window
 * fix about_me:include&exclude
 * Rework script initialization
 * Misc *
 * jsdoc all major functions
 * npmjs.com/package/bottleneck
 * Organize error throwing instead of silent and empty returns
 */

const getUserList = (responseObj) => {
    let tokensBatch = [];

    const sections = responseObj.body["0"].client_user_list.section;
    if (!sections) {
        throw 'There is no section!';
    }
    for (const section of sections) {
        const users = section.users;
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
    }

    if (responseURL.includes('SERVER_GET_USER') && !responseURL.includes('_LIST')) {
        const user = responseObj.body[0].user;
        // Filter out your own profile
        if (user.client_source === 0) {
            return;
        }
        userflowProxyEval.flow = user;
    }
};

const main = () => {
    console.log('Userscript started;')
    watchXHR(manageRequests);
};

export default main;