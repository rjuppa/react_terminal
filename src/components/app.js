"use strict";

var React = require("react");
var RouteHandler = require('react-router').RouteHandler;
var Header = require('./common/header');

var App = React.createClass({
	render: function(){
		return(
			<div>
			    <Header/>

                <div className="container">
				    <RouteHandler/>
                </div>

                <div className="container">
                    <div className="row"></div>
                </div>
			</div>
		);
	}
});

module.exports = App;