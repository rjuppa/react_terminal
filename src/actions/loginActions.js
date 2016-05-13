"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var authService = require('../services/authService');
var ActionTypes = require('../constants/actionTypes');

var LoginActions = {

    loginUser: function(credits){
        var promise = authService.login(credits);
        promise.then(
            //dispatches the action for the async-promise
            function (data) {       // returns json as string
                Dispatcher.dispatch({
                    actionType: ActionTypes.REQUEST_LOGIN_USER_SUCCESS,
                    payload: data
                });
            },
            function (reason) {     // returns json as string
                var obj = JSON.parse(reason);
                Dispatcher.dispatch({
                    actionType: ActionTypes.REQUEST_LOGIN_USER_ERROR,
                    error: obj.error
                });
            }
        );
        Dispatcher.dispatch({
            actionType: ActionTypes.REQUEST_LOGIN_USER,
            credits: credits
        });
    },

    logoutUser: function(){

        Dispatcher.dispatch({
            actionType: ActionTypes.REQUEST_LOGOUT_USER,
            credits: credits
        });
    },


    updateAuthor: function(author){
        var updatedAuthor = AuthorApi.saveAuthor(author);
        Dispatcher.dispatch({
            actionType: ActionTypes.REQUEST_LOGIN_USER_SUCCESS,
            author: updatedAuthor
        });
    },

    deleteAuthor: function(id){
        AuthorApi.deleteAuthor(id);
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_AUTHOR,
            id: id
        });
    }
};

module.exports = LoginActions;