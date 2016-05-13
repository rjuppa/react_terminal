"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var StartWork = React.createClass({
	render: function(){
		return (
            <div className="col-sm-6 col-sm-offset-3">
                <div className="text-center top-margin100">
                    <Link to="successPage" className="btn btn-success btn-huge">START WORK</Link>
                </div>
            </div>
		);
	}
});

module.exports = StartWork;
