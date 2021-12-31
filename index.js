import main from './src/main';

console.log('%cUserscript started!', 'color: #18e900;'); /* eslint-disable-line no-console*/

// Easier way to get to the base url to restart the script
window.re = () => {
    window.location.href = '/people-nearby';
};

main();
