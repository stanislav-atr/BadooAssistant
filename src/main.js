import watchXHR from './tools/watchXHR';
import {
    userflowProxyEval,
    userflowProxyClick,
} from './tools/userflowProxy';

const getUserList = (responseObj) => {
    const tokensBatch = [];

    const sections = responseObj.body['0'].client_user_list.section;
    if (!sections) {
        throw new Error('There is no section!');
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
        if (user && user.client_source === 0) {
            return;
        }
        userflowProxyEval.flow = user;
    }
};

const main = () => {
    watchXHR(manageRequests);
};

export default main;
