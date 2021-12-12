import browser from '../browser-api.js'
import observeDomChanges from './observeDomChanges';

const clicker = (userThumbnail) => {
    userThumbnail.click();
};

const feedClicker = (tokenArray) => {
    for (const token of tokenArray) {
        const selector = `[data-qa-user-id="${token}"]`
        const userThumbnail = browser.querySelector(selector);
        clicker(userThumbnail);
    }
};

const triggerGetUser = (tokenArray) => {
    //console.log(`Clicker got ${tokenArray.length} tokens`);
    //console.log(tokenArray);
    observeDomChanges((observer) => {
        const profilesReady = document.querySelector('button.csms-user-list-cell[data-qa-user-id]');
        if (profilesReady) {
            feedClicker(tokenArray);
            observer.disconnect();
        }
    });

    // Close last modal to be able to scroll the page
    const closeButton = browser.querySelector('.csms-modal > button[class*="--dark"]')
    if (closeButton) {
        closeButton.click();
    }
    // setTimeout(() => {
    //     closeButton.click();
    // }, 50)
};

export default triggerGetUser;