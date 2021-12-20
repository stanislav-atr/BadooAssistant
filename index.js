import { initConsoleLogImg } from 'console-log-img';
import browser from './src/browser-api';
import main from './src/main';

// Easier way to get to the base url to restart the script
browser.window.re = () => {
    browser.location.href = '/people-nearby';
};

initConsoleLogImg({
    printDimensions: true,
});

main()
