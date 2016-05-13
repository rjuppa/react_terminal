"use strict";

var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundPage = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
    <Route name="app" path="/" handler={require('./components/app')}>
        <DefaultRoute handler={require('./components/homePage')} />
        <Route name="home" handler={require('./components/homePage')} />
        <Route name="startWork" handler={require('./components/startWorkPage')} />
        <Route name="endWork" handler={require('./components/endWorkPage')} />
        <Route name="addAuthor" path="author" handler={require('./components/authors/manageAuthorPage')} />
        <Route name="manageAuthor" path="author/:id" handler={require('./components/authors/manageAuthorPage')} />
        <Route name="login" path="login" handler={require('./components/loginPage')} />
        <NotFoundPage handler={require('./components/notFoundPage')} />
    </Route>
);

module.exports = routes;