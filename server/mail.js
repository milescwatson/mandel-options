var mailin = require('mailin'),
    parse5 = require('parse5'),
    fs = require('fs'),
    mysql = require("./include/mysqlQueryExecutor");

var startMailServer = function(){
  mailin.start({
  port: 25,
  disableWebhook: true // Disable the webhook posting.
});

mailin.on('message', function (connection, data, content) {
  const verifiedAddress = 'noreply@tradingview.com';
  const fromAddress = data.from.address;
  const toAddress = data.to[0].address;

  if(toAddress.split('@')[0] === 'strategyparser'){
	  parseMessage(data);
  }

});
}

var parseMessage = function(data){
    const messageSubject = data.subject;
    const messageBody = data.html;

    var findDirection = function(strategyTitle){
    	if(strategyTitle.match(/down/i)){
    		return('bearish');
    	}else if(strategyTitle.match(/up/i)){
    		return('bullish');
    	}else{
    		return('invalid_strategy');
    	}
    }

    var getTickerAndExchanges = function(messageBody){
    	const tickerRegex = /[^>]*[A-Z]:[A-Z][^<]*/g

    	const parsedArray = [...messageBody.matchAll(tickerRegex)];

    	var tickerAndExchange = [];

    	for (var i = 0; i < parsedArray.length; i++) {
    		const selectedText = parsedArray[i][0]
    		var item = {}
    		item.exchange = selectedText.split(':')[0]
    		item.ticker = selectedText.split(':')[1]
    		tickerAndExchange.push(item);
    	}
    	return tickerAndExchange;
    }

    var getStrategyTitle = function(messageBody){
    	const regex = /\$\$.[^<]*/
    	var strategyTitle = messageBody.match(regex)[0]
    	return(strategyTitle)
    }

    var findDirection = function(strategyTitle){
    	if(strategyTitle.match(/down/i)){
    		return('bearish');
    	}else if(strategyTitle.match(/up/i)){
    		return('bullish');
    	}else{
    		return('invalid_strategy');
    	}
    }

    var sqlInsertStrategy = function(){
      // go through each ticker
      const strategyTitle = getStrategyTitle(messageBody),
            direction = findDirection(strategyTitle),
            tickerAndExchangeObjects = getTickerAndExchanges(messageBody);

      for (var i = 0; i < tickerAndExchangeObjects.length; i++) {
        const insertQuery = {
          sql: 'INSERT INTO Strategies(`ticker`, `exchange`, `strategyDirection`, `strategyParsedText`, `emailBodyText`) VALUES(?,?,?,?,?)',
          values: [tickerAndExchangeObjects[i].ticker, tickerAndExchangeObjects[i].exchange, direction, strategyTitle, messageBody]
        }
        mysql.query(insertQuery, function(error, result){
          if(error){
            console.log('error: could not add parsed strategy to database: ', error)
          }else{
            console.log('success, result = ', result);
          }
        });
      }
    }
    sqlInsertStrategy();
}

exports.start = startMailServer;
