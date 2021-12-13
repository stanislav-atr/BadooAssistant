const win = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window; /* eslint-disable-line */

const browser = {
    window: win,
    location: win.document.location,
    querySelector: win.document.querySelector.bind(win.document),
};

export default browser;
