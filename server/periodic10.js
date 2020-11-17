var apiCredentials = require('./include/apiCredentials'),
    mysql = require("./include/mysqlQueryExecutor"),
    moment = require('moment'),
    apiBaseUrl = apiCredentials.apiBaseUrl,
    mFetch = require('./include/mFetch'),
    fetch = require('node-fetch'),
    throttle = require('fetch-throttle'),
    fetchThrottle = throttle(fetch, 1, 200);

var getUniqueSymbols = function(callback){
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

var getPricesPeriodic = function(){
  // mFetch.getTextJSON('http://localhost:3001/health', function(error, result){
  //   console.log(error, result);
  // });


  // simply go through all unique symbols and capture prices
  var generateTimestamp = function(){
    var now = moment()
    const year = now.year()
    const month = now.month()
    const date = now.date()
    const hour = now.hour()
    const minute = now.minute();

    var mod = (minute%10)

    if(mod<5){
      now.minute(minute-mod)
    }else{
      now.minute(minute+(10-mod))
    }

    if(now.minute >= 55){
      now.add(1, 'hours')
      now.minute(0);
    }
    now.second(0)
    return(now.format('H:m M-D-YYYY').toString())
  }

  if(isMarketHours()){
    getUniqueSymbols((error, result)=>{
      for (var i = 0; i < result.length; i++) {
        const symbol = result[i]

        fetchThrottle(`${apiBaseUrl}stock/${symbol}/quote/latestPrice?token=${apiCredentials.iex.publishable}`).then(function(response){
          response.text().then(function(result){
            var price;
            try {
              price = parseFloat(result)
            }
            catch(e){
              console.log('error, incorrect API response');
            }
            if(typeof(price) === 'number'){
              const momentTime = generateTimestamp();
              const query = {
                sql: "INSERT INTO MarketData (ticker, price, momentTime) VALUES(?,?,?)",
                values: [symbol, result, momentTime]
              }
              console.log(`Insert market data for ${symbol}, at a price of ${result}`);

              mysql.executeQueryWithConnect(query, (error, result)=>{
                console.log('sql error, result = ', error, result);
              });

            }
          });
        })

      }
    })
  }else{
    console.log('Market is closed');
  }
}

var isMarketHours = function(){
  var now = moment();
  now.utcOffset(-5)

  var mOpen = moment().utcOffset(-5);
  mOpen.hour(9);
  mOpen.minute(30);

  var mClose = moment().utcOffset(-5);
  mClose.hour(16);
  mClose.minute(0);

  var isOpen = ((mOpen < now) && (mClose > now));
  return isOpen;
}
getPricesPeriodic();
