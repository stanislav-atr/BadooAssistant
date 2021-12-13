// Calls the callback on DOM changes
function observeDomChanges(callback) {
    const domMutationObserver = new MutationObserver(() => {
        callback(domMutationObserver);
    });

    domMutationObserver.observe(document, {
        childList: true,
        subtree: true,
    });
}

export default observeDomChanges;
