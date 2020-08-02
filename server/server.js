/*jshint node:true */
/*global require */
'use strict';

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mysql = require('./include/mysqlQueryExecutor'),
    user = require('./user'),
    port = 3001;

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))

app.use(session({
  secret: 'merrakesh',
  resave: true,
  saveUninitialized: true
}))

app.use(user.middleware);

app.post('/login', user.login);
app.get('/login-status', user.loginStatus);
app.get('/logout', user.logout);

app.get('/health', function(request, response, next) {
	  response.send('{"status": "healthy"}');
});

app.listen(port, function() {
  console.log(`Option Analysis server running on port ${port}!`);
});
