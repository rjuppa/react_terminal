"use strict";

var React = require("react");
var StartWork = React.createClass({
	render: function(){
		return (
            <div className="col-sm-6 col-sm-offset-3">
                <div className="text-center top-margin100">
                    <a href="#" className="btn btn-success btn-huge" onclick="actionHandler('assign')">START WORK</a>
                </div>
            </div>
		);
	}
});

module.exports = StartWork;
