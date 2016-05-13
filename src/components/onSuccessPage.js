"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var Success = React.createClass({
	render: function(){
		return (
            <div className="col-sm-8 col-sm-offset-2">
                <div className="text-center top-margin100">

          <div className="panel panel-logout">
              <div className="panel-heading text-center">Operace proběhla úspěšně</div>
              <div className="panel-body">
                <p><h2>message1</h2></p>
              </div>
              <div className="panel-heading text-center">
                  Budete automaticky odhlášen/a za <span id="counter">3</span> sec.
              </div>
          </div>

                </div>
            </div>
		);
	}
});

module.exports = Success;