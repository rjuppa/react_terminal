"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var actionService = require('../services/actionService');
var ActionTypes = require('../constants/actionTypes');

var WorkActions = {

    startWork: function(){
        var promise = actionService.workAction(userActions.START_WORK);
        promise.then(
            //dispatches the action for the async-promise
            function (data) {       // returns json as string
                Dispatcher.dispatch({
                    actionType: ActionTypes.REQUEST_START_WORK,
                    payload: data
                });
            },
            function (reason) {     // returns json as string
                var obj = JSON.parse(reason);
                Dispatcher.dispatch({
                    actionType: ActionTypes.REQUEST_BACKEND_ERROR,
                    error: obj.error
                });
            }
        );
    },

    endWork: function(){
        var promise = actionService.workAction(userActions.END_WORK);
        promise.then(
            //dispatches the action for the async-promise
            function (data) {       // returns json as string
                Dispatcher.dispatch({
                    actionType: ActionTypes.REQUEST_END_WORK,
                    payload: data
                });
            },
            function (reason) {     // returns json as string
                var obj = JSON.parse(reason);
                Dispatcher.dispatch({
                    actionType: ActionTypes.REQUEST_BACKEND_ERROR,
                    error: obj.error
                });
            }
        );
    }
};

module.exports = WorkActions;
