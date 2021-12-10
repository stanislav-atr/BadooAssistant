/**
 * Proxy under profile URLs array that indicates new batch and calls processing function on it.
 * @callback callback
 * @param {callback} callback - function to process batches.
 * @param {array} userflow 
 * @param {array} passedUsers - array to store users that passed the evaluation.
 */
const setFlowProxy = (userflow, callback) => {
    let watchBatches = new Proxy(userflow, {
        set: function (target, property, value, receiver) {
            // Do not save anything into proxied variable and immediately pass data to processing function.
            callback(value);
            return true;
        },
    });
    return watchBatches;
};

export default setFlowProxy;