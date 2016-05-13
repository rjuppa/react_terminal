var Request = require('request');
var Promise = require('bluebird');

var appConst = require('../constants/appConstants');


var AuthService = {
    login: function(credits) {
        return new Promise(function(resolve, reject){
            Request.post(
                {
                    url: appConst.LOGIN_URL,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36'},
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
    }
};

module.exports = AuthService;
