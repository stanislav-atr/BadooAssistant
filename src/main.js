import observeDomChanges from './tools/observeDomChanges';
import watchXHR from './tools/watchXHR';
import setFlowProxy from './tools/setFlowProxy';
import evaluateUser from './tools/filterEngine/evaluateUser';

/** TODO
 * Main *
 * Change fishing for profiles from clicker to get_user_list and into mocking get_user requests. Use github private repo and branches for that.
 *   after request fishing is done, test about_me:include&exclude
 * Rework script initialization
 * Misc *
 * Organize error throwing instead of silent and empty returns
 */

let watchedUserflow = {};
const userflowProxy = setFlowProxy(watchedUserflow, evaluateUser);

const listenForUsers = (request) => {
    const { readyState, responseURL, responseText } = request;
    // SERVER_GET_USER — part of the URL of XHR request for user to render
    // Full URL example: https://badoo.com/mwebapi.phtml?SERVER_GET_USER
    if (readyState === 4 && responseURL.includes('SERVER_GET_USER') && !responseURL.includes('_LIST')) {
        const responseObj = JSON.parse(responseText);
        const user = responseObj.body["0"].user;
        // Filter out your own profile
        if (user && user.client_source === 0) {
            return;
        }
        // Trigger proxy to start evaluating user
        userflowProxy.flow = user;
    }
};

const triggerGetUser = () => {
    let userCells = document.querySelectorAll('button.csms-user-list-cell[data-qa-user-id]');
    [...userCells].forEach((cell, i) => {
        setTimeout(() => {
            cell.click();
        }, /*i * 300*/);
    });
};

const main = () => {
    console.log('Userscript started;')
    watchXHR(listenForUsers);
    observeDomChanges((observer) => {
        const pofilesReady = document.querySelector('button.csms-user-list-cell[data-qa-user-id]');
        if (pofilesReady) {
            triggerGetUser();
            observer.disconnect();
        }
    });
};

export default main;