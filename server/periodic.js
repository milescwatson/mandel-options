// periodic tasks
var apiCredentials = require('./include/apiCredentials'),
    mysql = require("./include/mysqlQueryExecutor"),
    fetch = require('node-fetch'),
    _ = require('lodash'),
    validOptionSymbolsFile = require('./include/marketData/validOptionSymbols.json'),
    mFetch = require('./include/mFetch'),
    fs = require('fs'),
    moment = require('moment'),
    apiBaseUrl = apiCredentials.apiBaseUrl;

// PRIVATE
var getAllActiveTickers = function(callback){
  const query = {
    sql: 'SELECT ticker, exchange FROM Strategies',
    values: []
  }
  mysql.executeQueryWithConnect(query, function(error, result){
      callback(error,result);
  });
}

var cacheEODStockQuotes = function(callback){
  getAllActiveTickers((error, activeTickersWithDuplicates)=>{
    // get unique tickers
    var activeTickers = [];
    for(var i = 0; i < activeTickersWithDuplicates.length; i++){
      if(!_.includes(activeTickers, activeTickersWithDuplicates[i].ticker)){
        activeTickers.push(activeTickersWithDuplicates[i].ticker)
      }
    }
    for (var i = 0; i < activeTickers.length; i++) {
      const ticker = activeTickers[i];
      fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/quote/latestPrice?token=${apiCredentials.iex.publishable}`)
      .then(response => response.json())
      .then(
        (data)=>{
          let date_ob = new Date();
          let date = ("0" + date_ob.getDate()).slice(-2);
          let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
          let year = date_ob.getFullYear();
          let sqlDate = (year+'-'+month+'-'+date);

          var insertP = [ticker, sqlDate, parseFloat(data)]
          var query = {
            sql: 'INSERT INTO `MarketData`(`ticker`, `EODDate`, `price`) VALUES(?,?,?)',
            values: insertP
          }
          mysql.executeQueryWithConnect(query, (error, result)=>{
          });
        }
      );
    }
  });
}

var getValidOptionSymbols = function(){
  mFetch.getTextJSON(`https://cloud.iexapis.com/stable/ref-data/options/symbols?token=${apiCredentials.iex.publishable}`, function(error, result){
    if(!error){
      fs.writeFileSync('./include/marketData/validOptionSymbols.json', JSON.stringify(result));
    }
  });
}
