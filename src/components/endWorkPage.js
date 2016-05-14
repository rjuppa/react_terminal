"use strict";

var React = require("react");
var Router = require("react-router");
var WorkActions = require("../actions/workActions");
var ActionStore = require('../stores/actionStore');

var EndWork = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function(){
        return {
            work_ended: ActionStore.is_work_ended(),
            error: null
        };
    },

    // we listen all changes in model and handle them in _onChange handler
    componentWillMount: function(){ ActionStore.addChangeListener(this._onChange); },
    componentWillUnMount: function(){ ActionStore.removeChangeListener(this._onChange); },
    _onChange: function() {
        this.setState({
            work_ended: ActionStore.is_work_ended(),
            error: ActionStore.getErrorMessage()
        });
        if( this.state.error ){
            toastr.error(this.state.error);
        }
        if (this.state.work_ended){
            this.transitionTo('successPage', null, {message: 'WORK HAS ENDED'});
        }
    },

    doStartWork: function(event){
        WorkActions.endWork();
    },

	render: function(){
		return (
            <div className="col-sm-6 col-sm-offset-3">
                <div className="text-center top-margin100">21
                    <button className="btn btn-success btn-huge" onClick={this.doStartWork}>END WORK</button>
                </div>
            </div>
		);
	}
});


module.exports = EndWork;
