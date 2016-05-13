"use strict";

var React = require("react");
var EndWork = React.createClass({
	render: function(){
		return (
            <div className="col-sm-6 col-sm-offset-3">
                <div className="text-center top-margin100">
                    <a href="#" className="btn btn-danger btn-huge" onclick="actionHandler('assign')">END WORK</a>
                </div>
            </div>
		);
	}
});

module.exports = EndWork;
