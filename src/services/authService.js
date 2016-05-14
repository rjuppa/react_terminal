var Request = require('request');
var Promise = require('bluebird');

var endPoints = require('../constants/endPoints');


var AuthService = {
    login: function(credits) {
        return new Promise(function(resolve, reject){
            Request.post(
                {
                    url: endPoints.LOGIN_URL,
                    headers: endPoints.HEADERS,
                    form: {chipcard_num: credits.chipcard_num, mac_address: credits.mac_address}
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
    },

    logout: function(){
        console.log('AuthService logout');
        return new Promise(function(resolve, reject){
            Request.get(
                {
                    url: endPoints.LOGOUT_URL,
                    headers: endPoints.HEADERS
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

module.exports = AuthService;
