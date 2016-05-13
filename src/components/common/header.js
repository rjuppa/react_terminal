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
		var tableStyle = {width: '100%', backgroundColor: 'black'};
		var colStyle = {width: '220px', padding: '5px'};

        var is_authenticated = false;
        if(user && user.hasOwnProperty("is_authenticated")){
            is_authenticated = user.is_authenticated;
        }

        if(is_authenticated){
            return (
                <div>
                    <table id="term_head" style={tableStyle}>
                        <tr>
                            <td style={colStyle}>
                                <Link to="app" className="greenbutton">Home</Link>
                            </td>
                            <td colSpan="2" className="term_header">
                                <div><span>TERMINAL</span> </div>
                                <div><span>User: {this.state.username}</span> </div>
                            </td>
                            <td style={colStyle}>
                                <a href="http://localhost:3000/logout" className="redbutton">Logout</a>
                            </td>
                        </tr>
                    </table>
                    <div><span>{this.state.error}</span></div>
                </div>
            );
        }
        else{
            return (
                <div>
                    <table id="term_head" style={tableStyle}>
                        <tr>
                            <td colSpan="2" className="term_header">
                                <span>TERMINAL</span>
                            </td>
                        </tr>
                    </table>
                    <div><span>{this.state.error}</span></div>
                </div>
            );
        }

	}
});

module.exports = Header;
