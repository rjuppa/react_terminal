"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _user = {};
var _error = null;

var LoginStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },

    getUser: function() {
        return _user;
    },

    getUserName: function(){
        if(_user){
            return _user.username;
        }
        return '';
    },

    getErrorMessage: function(){
        return _error;
    }
});

Dispatcher.register(function(action) {
    switch (action.actionType) {
        case ActionTypes.REQUEST_LOGIN_USER:
            _user = null;
            _error = null;
            LoginStore.emitChange();
            break;

        case ActionTypes.REQUEST_LOGIN_USER_SUCCESS:
            var payload = JSON.parse(action.payload);
            var user_id = payload['id'];
            var username = payload.username;
            _user = {id: user_id, username: username, is_authenticated: true};
            _error = null;
            LoginStore.emitChange();
            break;

        case ActionTypes.REQUEST_LOGIN_USER_ERROR:
            _user = null;
            _error = action.error;
            LoginStore.emitChange();
            break;

        case ActionTypes.REQUEST_LOGOUT_USER:
            _user = null;
            _error = null;
            LoginStore.emitChange();
            break;

        default:
            break;
    }
});

module.exports = LoginStore;