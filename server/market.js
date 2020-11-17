// used to access option market data api
var apiCredentials = require('./include/apiCredentials'),
    fetch = require('node-fetch'),
    mFetch = require('./include/mFetch'),
    mysql = require('./include/mysqlQueryExecutor'),
    moment = require('moment'),
    apiCache = require('./apiCache'),
    _ = require('lodash'),
    validOptionSymbolsFile = require('./include/marketData/validOptionSymbols.json'),
    apiBaseUrl = apiCredentials.apiBaseUrl;

var getUniqueSymbolsP = function(callback){
  const myQuery = {
    sql: "SELECT * FROM Strategies"
  }
  var a = {}
  mysql.executeQueryWithConnect(myQuery, (error, result)=>{
    for (var i = 0; i < result.length; i++) {
      a[result[i].ticker] = null;
    }
    callback(error, Object.keys(a));
  });
}

var getMarketData = function(symbol, callback){
  const interval = 2;
  const query = {
    sql: "SELECT * FROM MarketData WHERE ticker=? ORDER BY id ASC",
    values: [symbol]
  }
  mysql.executeQueryWithConnect(query, (error, tickerPriceValues)=>{
    callback(null, symbol, tickerPriceValues)
  });
}

var getUniqueSymbols = function(request, response){
  getUniqueSymbolsP(function(error, result){
    var toSend = {
      error: error,
      result: result
    }
    response.send(JSON.stringify(toSend))
  })
}

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
          returnObject.companyName = '';
          returnObject.sector = '';
          returnObject.error = "Error, API key is invalid for this information";
          callback(error, returnObject)
        }
      });
    }else{
      returnObject.error = "Error, API key is invalid for this information";
      callback(error, returnObject)
    }
  });
}

var getStrikes = function(request, response){
  const symbol = request.params.symbol;
  // console.log('url = ', `${apiBaseUrl}stock/${symbol}/options/?token=${apiCredentials.iex.publishable}`);
  mFetch.getTextJSON(`${apiBaseUrl}stock/${symbol}/options/?token=${apiCredentials.iex.publishable}`, function(error, result){
    // console.log('getStrikes =', result);
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
          if(result[0] !== null){
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
          }

        })
      }
    }
  });
}

var getHistorical = function(request, response){
  const symbol = request.params.symbol;

  mFetch.getTextJSON(`https://cloud.iexapis.com/stable/stock/${symbol}/chart/1m?token=${apiCredentials.iex.publishable}&sort=desc`, function(error, result){
    if(!error){

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
  }else {
    response.send('{"status":"error"}')
  }
  });
}

var symbolHasOptions = function(request, response){
  const symbol = (request.params.symbol).toUpperCase();
  var hasOptions = Object.keys(validOptionSymbolsFile).includes(symbol);
  response.send(hasOptions);
}

var symbolHasOptionsLocal = function(symbol){
  var hasOptions = false;
  symbol = symbol.toUpperCase();
  hasOptions = Object.keys(validOptionSymbolsFile).includes(symbol);
  return hasOptions;
}

exports.getHQuote = getHQuote;
exports.getStrikes = getStrikes;
exports.getDataByMonth = getDataByMonth;
exports.isOptionDataAvailable = isOptionDataAvailable;
exports.quote = quote;
exports.getIndividualUnderlyingInfo = getIndividualUnderlyingInfo;
exports.getHistorical = getHistorical;
exports.symbolHasOptions = symbolHasOptions;
exports.symbolHasOptionsLocal = symbolHasOptionsLocal;
exports.getUniqueSymbols = getUniqueSymbols;
exports.getMarketData = getMarketData;
