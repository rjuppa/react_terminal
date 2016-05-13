"use strict";

var jQuery, $;
$ = jQuery = require('jquery');  // Bootstrap needs it

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});


