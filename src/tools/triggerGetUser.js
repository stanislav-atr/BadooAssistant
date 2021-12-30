import browser from '../browser-api';
import observeDomChanges from './observeDomChanges';

const clicker = (userThumbnail) => {
    userThumbnail.click();
};

const feedClicker = (tokensArray) => {
    for (const [index, token] of tokensArray.entries()) {
        const selector = `[data-qa-user-id="${token}"]`;
        const userThumbnail = browser.querySelector(selector);
        // Progressive timeout to sync clicker with profiles rendering and slow down vs captcha
        setTimeout(() => {
            clicker(userThumbnail);
        }, (1500 * index) / 2);
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
