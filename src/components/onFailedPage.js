"use strict";

var React = require("react");
var Router = require("react-router");
var LoginActions = require("../actions/loginActions");


var Failed = React.createClass({
    getInitialState: function(){
        return {
            counter: 3
        };
    },

    componentDidMount: function(){
        if(!this.interval) {
            this.interval = setInterval(this.countDown, 1000);
        }
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    countDown: function(){
        if(this.state.counter >= 0) {
            if(this.state.counter == 0){
                LoginActions.logoutUser();
            }
            else{
                var newCount = this.state.counter - 1;
                this.setState({
                    counter: newCount
                });
            }
        }
    },

	render: function(){
		return (
            <div className="col-sm-8 col-sm-offset-2">
                <div className="text-center top-margin100">

          <div className="panel panel-logout">
              <div className="panel-heading text-center">Warning</div>
              <div className="panel-body">
                <p><h2>{this.props.query.message}</h2></p>
              </div>
              <div className="panel-heading text-center">
                 You are going to be logoff in <span id="counter">{this.state.counter}</span> sec.
              </div>
          </div>

                </div>
            </div>
		);
	}
});

module.exports = Failed;
