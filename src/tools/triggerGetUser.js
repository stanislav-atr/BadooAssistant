import browser from '../browser-api.js'
import observeDomChanges from './observeDomChanges';

const clicker = (userThumbnail) => {
    userThumbnail.click();
};

const feedClicker = (tokensArray) => {
    for (const [i, token] of tokensArray.entries()) {
        const selector = `[data-qa-user-id="${token}"]`
        const userThumbnail = browser.querySelector(selector);
        clicker(userThumbnail);
    }
};

const triggerGetUser = (tokensArray) => {
    // Wait for first profile render to be able to click
    observeDomChanges((observer) => {
        const profilesReady = document.querySelector('button.csms-user-list-cell[data-qa-user-id]');
        if (profilesReady) {
            feedClicker(tokensArray);
            observer.disconnect();
        }
    });
};

export default triggerGetUser;