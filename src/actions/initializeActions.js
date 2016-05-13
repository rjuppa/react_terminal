"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
//var AuthorApi = require('../api/authorApi');  AuthorApi.getAllAuthors()

var InitializeActions = {
    initApp: function() {
        Dispatcher.dispatch({
            actionType: ActionTypes.INITIALIZE,
            initialData: {
                authors: []
            }
        });
    }
};

module.exports = InitializeActions;
