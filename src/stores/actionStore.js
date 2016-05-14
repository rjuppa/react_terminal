"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _work_started = false;
var _work_ended = false;
var _error = null;

var ActionStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },

    is_work_started: function(){
        return _work_started;
    },

    is_work_ended: function(){
        return _work_ended;
    },
    
    getErrorMessage: function(){
        return _error;
    }
});

Dispatcher.register(function(action){
    switch(action.actionType){
        case ActionTypes.REQUEST_START_WORK:
            _work_started = true;
            ActionStore.emitChange();
            break;
        case ActionTypes.REQUEST_END_WORK:
            _work_ended = true;
            ActionStore.emitChange();
            break;
        case ActionTypes.REQUEST_BACKEND_ERROR:
            _error = action.error;
            ActionStore.emitChange();
            break;
        default:
            break;
    }
});

module.exports = ActionStore;