// used to access option market data api
var apiCredentials = require('./include/apiCredentials'),
    fetch = require('node-fetch'),
    mFetch = require('./include/mFetch'),
    mysql = require('./include/mysqlQueryExecutor'),
    moment = require('moment'),
    apiCache = require('./apiCache'),
    validOptionSymbolsFile = require('./include/marketData/validOptionSymbols.json'),
    apiBaseUrl = "https://cloud.iexapis.com/stable/";

var getHQuote = function(request, response){
  var symbol = request.params.symbol;
  mFetch.getTextJSON(`${apiBaseUrl}stock/${symbol}/company/?token=${apiCredentials.iex.publishable}`, function(error, result){
    if(!error){
      var toSend = {
        companyName: result.companyName,
        sector: result.sector,
      }
      response.send(JSON.stringify(toSend))
    }else{
      response.send('null');
    }
  });

}

// price: result.latestPrice,
// change: result.change
var quote = function(request, response){
  var symbol = request.params.symbol;
  mFetch.getTextJSON(`${apiBaseUrl}stock/${symbol}/quote?token=${apiCredentials.iex.publishable}`, function(error, result){
    if(!error){
      var toSend = {
        price: result.latestPrice,
        change: result.change
      }
      response.send(JSON.stringify(toSend))
    }else{
      response.send('null');
    }
  });
}

var getQuoteAndHQuote = function(symbol, callback){
  var returnObject = {};
  mFetch.getTextJSON(`${apiBaseUrl}stock/${symbol}/quote?token=${apiCredentials.iex.publishable}`, function(error, result){
    if(!error){
      returnObject["change"] = result.change;
      returnObject["price"] = result.latestPrice;
      mFetch.getTextJSON(`${apiBaseUrl}stock/${symbol}/company/?token=${apiCredentials.iex.publishable}`, function(error, result){
        if(!error){
          returnObject.companyName = result.companyName;
          returnObject.sector = result.sector;
          callback(null, returnObject);
        }else{
          callback(error, null)
        }
      });
    }else{
      callback(error, null)
    }
  });
}

var getStrikes = function(request, response){
  const symbol = request.params.symbol;
  mFetch.getTextJSON(`${apiBaseUrl}stock/${symbol}/options/?token=${apiCredentials.iex.publishable}`, function(error, result){
    response.send(JSON.stringify(result));
  })
}

var getDataByMonth = function(request, response){
  const symbol = request.params.symbol;
  const yyyymm = request.params.month;
  mFetch.getTextJSON(`${apiBaseUrl}stock/${symbol}/options/${yyyymm}?token=${apiCredentials.iex.publishable}`, function(error, result){
    response.send(JSON.stringify(result));
    // response.send(JSON.stringify(testData));
  })
}

var isOptionDataAvailable = function(request, response){
  const symbol = request.params.symbol;
  mFetch.getTextJSON(`${apiBaseUrl}stock/${symbol}/options/${yyyymm}?token=${apiCredentials.iex.publishable}`, function(error, result){
    response.send(JSON.stringify(result));
    // response.send(JSON.stringify(testData));
  });
}

var getIndividualUnderlyingInfo = function(request, response){
  const id = request.params.id;
  const query = {
    sql: 'SELECT `ticker`, `strategyDirection`, `exchange`, `createdDateTime`, `strategyParsedText` FROM Strategies WHERE `id` = ?',
    values: [id]
  }
  mysql.executeQueryWithConnect(query, function(error, result){
    if(error){
      response.send('null')
    }else{
      if(result[0].length === 0 || error){
        response.send(error)
      }else{
        getQuoteAndHQuote(result[0].ticker, function(error, qhResult){
              var toReturn = {
                strategyParsedText: result[0].strategyParsedText,
                symbol: result[0].ticker,
                strategyDirection: result[0].strategyDirection,
                exchange: result[0].exchange,
                createdDateTime: result[0].createdDateTime,
                price: qhResult.price,
                change: qhResult.change,
                companyName: qhResult.companyName,
                sector: qhResult.sector
              }
              response.send(JSON.stringify(toReturn));
        })
      }
    }
  });
}

var getHistorical = function(request, response){
  const symbol = request.params.symbol;

  mFetch.getTextJSON(`https://cloud.iexapis.com/stable/stock/${symbol}/chart/1m?token=${apiCredentials.iex.publishable}&sort=desc&includeToday=true`, function(error, result){
    if(error){
      response.send("error");
    }
    var ret = [];
    for (var i = 0; i < result.length; i++) {
      var obj = {};
      obj.date = result[i].date;
      obj.close = result[i].close;
      obj.change = result[i].change;
      obj.changePercent = result[i].changePercent
      obj.label = result[i].label;
      ret.push(obj);
    }
    response.send(ret);
  });
}

var symbolHasOptions = function(request, response){
  const symbol = (request.params.symbol).toUpperCase();
  var hasOptions = Object.keys(validOptionSymbolsFile).includes(symbol);
  response.send(hasOptions);
}

exports.getHQuote = getHQuote;
exports.getStrikes = getStrikes;
exports.getDataByMonth = getDataByMonth;
exports.isOptionDataAvailable = isOptionDataAvailable;
exports.quote = quote;
exports.getIndividualUnderlyingInfo = getIndividualUnderlyingInfo;
exports.getHistorical = getHistorical;
exports.symbolHasOptions = symbolHasOptions;
