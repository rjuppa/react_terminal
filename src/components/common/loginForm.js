"use strict";

var React = require("react");
var TextInput = require("./textInput");

var LoginForm = React.createClass({
	propTypes: {
        credits: React.PropTypes.object.isRequired,
        onLogin: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },
    
	render: function(){
		return (
			<form>
				<h1>Log In</h1>

                <TextInput name="chipcard_num"
                    label="Chipcard No."
                    value={this.props.credits.chipcard_num}
                    onChange={this.props.onChange}
                    error={this.props.errors.chipcard_num} />
                <br/>

                <TextInput name="mac_address"
                    label="MAC address"
                    value={this.props.credits.mac_address}
                    onChange={this.props.onChange}
                    error={this.props.errors.mac_address} />
                <br/>

                <input type="submit"
                    value="Login"
                    className="btn btn-success"
                    onClick={this.props.onLogin} />
			</form>
		);
	}
});

module.exports = LoginForm;