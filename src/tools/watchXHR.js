/**
 * Overrides global XMLHtttpRequest open() method to spy on xhrs.
 * @callback filterCallback
 * @param {filterCallback} shouldBlock - Returns true if request should be blocked and vice versa.
 *  Filtering by URL aborts request faster than by response.
 */
const watchXHR = (requestListener) => {
    const nativeOpen = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function () {
        function intercept(e) {
            const request = e.currentTarget;
            requestListener(request);
            // EventListener is removed from requests after they are done.
            if (request.readyState === 4) {
                request.removeEventListener('readystatechange', intercept);
            }
        }
        // Repeated .open() on xhr object will trigger this.addEventListener again.
        this.addEventListener('readystatechange', intercept);
        // eslint-disable-next-line prefer-rest-params
        return nativeOpen.apply(this, arguments);
    };
};

export default watchXHR;
