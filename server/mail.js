var mailin = require('mailin'),
    parse5 = require('parse5'),
    fs = require('fs');

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
    ticker = ticker[0].split("<")[0].trim();

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
    	return(accumulator.join(""));
    }
    var strategyTitle = parseStrategy(messageBody)

    console.log('strategyTitle = ', strategyTitle)

    var strategyDirection = '';
}

exports.start = startMailServer;
