/**
 * A singleton that operates as central hub for all updates
 */

var Dispatcher = require('flux').Dispatcher;

module.exports = new Dispatcher();


/**
 * Dispatches three actions for an async operation represented by promise.
 */
//var DispatchAsync = function (promise, types, actions) {
//    Dispatcher.dispatch(types.request, actions.request);
//    //NB: unable to use Promise.catch() syntax here
//    promise.then(
//        //dispatches the action for the async-promise-resolved
//        //with a hash of the async-promise params and the response body
//        function (body) {
//            Dispatcher.dispatch(types.success, {actionType: actions.success, body: body});
//        },
//        function (error) {
//            Dispatcher.dispatch(types.failure, {actionType: actions.failure, error: error});
//        }
//    );
//};
//
//module.exports = new DispatchAsync();

