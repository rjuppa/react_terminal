"use strict";

var React = require("react");
var RouteHandler = require('react-router').RouteHandler;
var Header = require('./common/header');

var App = React.createClass({
	render: function(){
		return(
			<div className="col-md-12">
			    <Header/>
                <div className="container-fluid">
				    <RouteHandler/>
                </div>
			</div>
		);
	}
});

module.exports = App;