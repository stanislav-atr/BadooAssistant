const win = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;

const browser = {
    window: win,
    location: win.document.location,
};

export default browser;