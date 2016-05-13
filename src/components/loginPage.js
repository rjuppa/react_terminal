"use strict";

var React = require("react");
var Router = require("react-router");

var LoginForm = require("./common/loginForm");
var LoginActions = require("../actions/loginActions");

var Login = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function(){
        return {
            credits: {chipcard_num: 'N001', mac_address: '02:42:6c:01:8c:01'},
            errors: {}
        };
    },

	setFormState: function(event){
        this.setState({dirty: true});
        var field = event.target.name;
        this.state.credits[field] = event.target.value;
        return this.setState({credits: this.state.credits});
    },
	
    loginFormIsValid: function(){
        var formIsValid = true;
        this.state.errors = {};     // clear previous errors
        if( this.state.credits.chipcard_num.length < 3){
            this.state.errors.chipcard_num = 'chipcard_num => min. 3 chars';
            formIsValid = false;
        }
        if( this.state.credits.mac_address.length < 3){
            this.state.errors.mac_address = 'mac_address => min. 3 chars';
            formIsValid = false;
        }
        this.setState({errors: this.state.errors});
        return formIsValid;
    },
	
	doLogin: function(event){
        event.preventDefault();
        if(!this.loginFormIsValid()){
            return;
        }
        LoginActions.loginUser(this.state.credits);
        this.setState({dirty: false});
        this.transitionTo('startWork');
    },
	
	render: function(){
        if(!this.state.errors){
            this.state.errors = {};
        }
		return (
			<div className="col-sm-12">
                <div className="col-sm-4 col-sm-offset-4">
                    <LoginForm
                        credits={this.state.credits}
                        onChange={this.setFormState}
                        onLogin={this.doLogin}
                        errors={this.state.errors} />
                </div>
			</div>
		);
	}
});

module.exports = Login;