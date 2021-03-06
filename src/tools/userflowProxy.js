import evaluateUser from './filterEngine/evaluateUser';
import triggerGetUser from './triggerGetUser';

/**
 * Proxy under profile URLs array that indicates new batch and calls processing function on it.
 * @callback callback
 * @param {callback} callback - function to process batches.
 * @param {array} userflow
 * @param {array} passedUsers - array to store users that passed the evaluation.
 */
const setFlowProxy = (userflow, callback) => {
    const proxy = new Proxy(userflow, {
        set(target, property, value) {
            // Do not set anything, immediately pass data to processing function.
            callback(value);
            return true;
        },
    });
    return proxy;
};

// Pass user for evaluation
const evaluationUserflow = {};
const userflowProxyEval = setFlowProxy(evaluationUserflow, evaluateUser);

// Pass user list to clicker
const clickUserflow = {};
const userflowProxyClick = setFlowProxy(clickUserflow, triggerGetUser); // change to clicker

export {
    userflowProxyEval,
    userflowProxyClick,
};
