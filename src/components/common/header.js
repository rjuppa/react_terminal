"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var LoginStore = require("../../stores/loginStore");

var Header = React.createClass({
    mixins: [
        Router.Navigation
    ],
    getInitialState: function(){
        return {
            username: LoginStore.getUserName(),
            error: ''
        };
    },

    // we listen all changes in model for grid bellow
    componentWillMount: function(){ LoginStore.addChangeListener(this._onChange); },
    componentWillUnMount: function(){ LoginStore.removeChangeListener(this._onChange); },
    _onChange: function() {
        this.setState({username: LoginStore.getUserName(), error: LoginStore.getErrorMessage()});
    },

	render: function(){
        var user = LoginStore.getUser();
        var is_authenticated = false;
        if(user && user.hasOwnProperty("is_authenticated")){
            is_authenticated = user.is_authenticated;
        }

        if(is_authenticated){
            return (
                <div>
                    <div className="col-sm-12" id="terminalHeader">
                        <div className="col-sm-2 text-center">
                            <Link to="app" className="btn btn-success btn-huge w100">Home</Link>
                        </div>
                        <div className="col-sm-8 text-center">
                            <div><h4>TERMINAL</h4> </div>
                            <div><h4>User: {this.state.username}</h4></div>
                        </div>
                        <div className="col-sm-2 text-center">
                            <a href="http://localhost:3000/logout" className="btn btn-danger btn-huge w100" onclick="actionHandler('assign')">Logout</a>
                        </div>
                    </div>
                    <div><span>{this.state.error}</span></div>
                </div>
            );
        }
        else{
            return (
                <div>
                    <div className="col-sm-12" id="terminalHeader">
                        <div className="col-sm-2 text-center">
                        </div>
                        <div className="col-sm-8 text-center">
                            <div><h4>TERMINAL</h4></div>
                            <div><h4></h4></div>
                        </div>
                        <div className="col-sm-2 text-center">
                        </div>
                    </div>
                    <div><span>{this.state.error}</span></div>
                </div>
            );
        }

	}
});

module.exports = Header;
