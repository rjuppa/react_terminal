"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;


var Home = React.createClass({
	render: function(){
		return (
			<div className="jumbotron text-center">
				<h2>Welcome in Terminal</h2>
                <img src="images/login-card.png" alt="login" />
                <h3 className="login_header">
                    Login with RFID card, please or <Link to="login" className="btn btn-success">Login</Link>
                </h3>
			</div>
		);
	}
});

module.exports = Home;