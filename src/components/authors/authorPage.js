"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var toastr = require('toastr');


var Authors = React.createClass({
    getInitialState: function(){
        return {
            authors: []
        };
    },


	render: function(){

		return (
			<div>
				<h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-success">Add author</Link>
                <table className="table">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th></th>
                    </thead>
                    <tbody>
                        aaa
                    </tbody>
                </table>
			</div>
		);
	}
});

module.exports = Authors;
