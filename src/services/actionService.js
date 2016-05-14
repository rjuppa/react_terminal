"use strict";

var Request = require('request');
var Promise = require('bluebird');

var userActions = require('../constants/userActions');
var endPoints = require('../constants/endPoints');

// data = {action_id: action_id, position_id: position_id, line_id: line_id};

var ActionService = {

    workAction: function(action_id) {
        return new Promise(function(resolve, reject){
            Request.post(
                {
                    url: endPoints.ACTION_URL,
                    headers: endPoints.HEADERS,
                    json: {action_id: action_id, position_id: 1, line_id: 1}
                },
                function(err, response, body){
                    if (err) {
                        return reject(err);
                    }
                    if (response.statusCode >= 400) {
                        return reject(body);
                    }
                    return resolve(body);
                }
            );
        });
    }
};

module.exports = ActionService;
