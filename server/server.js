/*jshint node:true */
/*global require */
'use strict';

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mysql = require('./include/mysqlQueryExecutor'),
    mailServer = require('./mail'),
    user = require('./user'),
    port = 3001,
    market = require('./market'),
    strategy = require('./strategy');

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

app.get('/h-quote/:symbol', market.getHQuote);
app.get('/quote/:symbol', market.quote);

// excel app queries
app.get('/delete-strategy/:id', strategy.deleteStrategy);
app.get('/get-strategy-ids', strategy.getStrategyIDs);

app.get('/get-unique-strategy-ids', strategy.getUniqueStrategies);

// market
app.get('/get-strike-dates/:symbol', market.getStrikes);
app.get('/get-data-by-month/:symbol/:month', market.getDataByMonth);
app.get('/is-option-data-available/:symbol', market.isOptionDataAvailable)
app.get('/get-underlying-info/:id', market.getIndividualUnderlyingInfo);
app.get('/get-historical/:symbol', market.getHistorical);
app.get('/get-historical/', market.getHistoricalBlank);


app.get('/health', function(request, response, next) {
	  response.send('{"status": "healthy"}');
});

app.use('/', express.static('../client/build'));

app.listen(port, function() {
  console.log(`Excel Option Analysis server running on port ${port}!`);
});

mailServer.start();
