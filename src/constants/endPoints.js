"use strict";

var BASE_URL = 'http://localhost:3000/';

var URLS = {
    BASE_URL: BASE_URL,
    LOGIN_URL: BASE_URL + 'index',
    LOGOUT_URL: BASE_URL + 'logout',
    ACTION_URL: BASE_URL + 'actions',

    HEADERS: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36'
    }
};

module.exports = URLS;