var apiCredentials = require('./include/apiCredentials'),
    mysql = require('./include/mysqlQueryExecutor'),
    moment = require('moment'),
    async = require('async'),
    _ = require('lodash'),
    apiBaseUrl = apiCredentials.apiBaseUrl,
    market = require('./market.js'),
    getMarketData = market.getMarketData;

var getTileTrendSymbol = function(selectedSymbol, callbackFinal){
  async.waterfall([
    function (callback){
      getMarketData(selectedSymbol, function(error, symbol, storedMarketData){
        callback(error, symbol, storedMarketData)
      })
    },

    function(symbol, storedMarketData, callback){
      if(storedMarketData.length > 0){
        accumulateMarketData(storedMarketData, symbol, function(error, accumulated){
          callback(error, symbol, accumulated)
        });
      }else{
        callback(null, symbol, {})
      }
    }

  ], function(error, symbol, accumulated){
    // console.log('final callback', symbol, accumulated);
    if(!error){
      callbackFinal(error, accumulated)
    }else{
      callbackFinal(error, {})
    }
  })
}

var accumulateMarketData = function(marketData, ticker, callback){
  var initTime = moment(marketData[0].momentTime, "h:m M-D-YYYY"),
      initPrice = marketData[0].price,
      interval = 1,
      timeIterator = moment(initTime).add(interval, "hours"),
      accumulatorTemp = [],
      accumulated = {};

  var generateTile = function(){
    var timeIteratorClone = moment(timeIterator),
        justPrices = [];

    if(accumulatorTemp.length > 0){
      var touched = false;
      _.each(accumulatorTemp, (priceItem, key)=>{
        if (priceItem.price > initPrice) {
          touched = true;
        }
        justPrices.push(parseFloat(priceItem.price));
      });
      initPrice = justPrices[0];

      var finalTile = {}
      if(ticker === "TWTR"){
        // console.log('justPrices = ', justPrices);
      }

      if (accumulatorTemp[(accumulatorTemp.length-1)].price >= initPrice) {
        // closed above init price
        finalTile.color = "green";
      } else if(accumulatorTemp[(accumulatorTemp.length-1)].price < initPrice) {
        if (touched) {
          finalTile.color = "yellow";
        } else {
          finalTile.color = "red";
        }
      }

      finalTile.min = Math.min(...justPrices);
      finalTile.max = Math.max(...justPrices);
      finalTile.ticker = ticker;
      finalTile.initTime = timeIterator.toString();
      finalTile.initPrice = initPrice;
      finalTile.justPrices = justPrices;

      accumulated[(timeIteratorClone.toString())] = finalTile;
      accumulatorTemp = []
      justPrices = [];
      timeIterator.add(interval, "hours")
    }
  }

  _.each(marketData, function(value, key){
      var momentTime = moment(value.momentTime, "h:m M-D-YYYY")
      if(momentTime < timeIterator){
        var temp = {
          price: value.price,
          momentTime: value.momentTime
        }
        accumulatorTemp.push(temp)

        // if(key === marketData.length-1){
        //   generateTile()
        //   initPrice = value.price;
        // }
    } else {
      generateTile();
      initPrice = value.price;
      if(value.ticker === "TWTR"){
        // console.log('initPrice, ', initPrice);
        // console.log('accumulatorTemp', accumulatorTemp);
      }

    }
  });
  callback(null, accumulated);
}

exports.getTiles = function(request, response){
  const symbol = request.params.symbol;
  getTileTrendSymbol(symbol, function(error, result) {
    var toSend = {
      error: error,
      result: result
    }
    response.send(JSON.stringify(toSend));
  });
}

// getTileTrendSymbol('TWTR', function(error, result){
//   console.log('error, result = ', error, result);
// })
