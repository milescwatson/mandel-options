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
    //get ticker
    var ticker = messageBody.match("......</span></a> alert");
    if(ticker){
    	ticker = ticker[0].split("<")[0].trim();
    }

    var parseStrategy = function(messageBody){
    	var target = '$$',
    			targetIterator = 0,
    			accumulator = [],
    			accumulate = false;

    	for (var i = 0; i < messageBody.length; i++) {
    		if(messageBody[i] === '$' && messageBody[i+1] === '$'){
    			accumulate = true;
    		}
    		if(accumulate){
    			if(messageBody.substr(i,i+4) === "</td>"){
    				accumulate = false;
    			}else{
    				accumulator.push(messageBody[i]);
    			}
    		}

    	}
    	return(accumulator.join("").split('</td>')[0].trim());
    }
    var strategyTitle = parseStrategy(messageBody)
    
    var findDirection = function(strategyTitle){
	if(strategyTitle.match(/down/i)){
		return('bearish');
	}else if(strategyTitle.match(/up/i)){
		return('bullish');
	}else{
		return('invalid_strategy');
	}
    }
    var strategyDirection = findDirection(strategyTitle);
    
    var returnObject = {
        'ticker': ticker,
	'strategyTitle': strategyTitle,
	'direction': strategyDirection
    }
    const insertQuery = {
        sql: 'INSERT INTO Strategies(`ticker`, `strategyDirection`, `strategyParsedText`, `emailBodyText`) VALUES(?,?,?,?)',
	values: [ticker, strategyDirection, strategyTitle, messageBody]
    }
    mysql.query(insertQuery, function(error, result){
       if(error){
           console.log('error: could not add parsed strategy to database: ', error)
       }else{
       }
    });
}

exports.start = startMailServer;
