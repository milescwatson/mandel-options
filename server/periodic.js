// periodic tasks
var apiCredentials = require('./include/apiCredentials'),
    mysql = require("./include/mysqlQueryExecutor"),
    fetch = require('node-fetch');

// PRIVATE
var getAllActiveTickers = function(callback){
  const query = {
    sql: 'SELECT ticker, exchange FROM Strategies',
    values: []
  }
  mysql.query(query, (error, result)=>{
    if(error){
      callback(error,null)
    }else{
      callback(null,result);
    }
  });
}

getAllActiveTickers(function(error, result){
  console.log('result = ', result);
})

// PUBLIC
// var cacheEODStockQuotes = function(callback){
//   getAllActiveTickers((error, activeTickers)=>{
//     console.log('error, data = ', error, activeTickers);
//     // if(error){
//     //   console.log('error cb');
//     //   return (null);
//     // }
//     // for (var i = 0; i < activeTickers.length; i++) {
//     //   console.log(i)
//     //   const ticker = activeTickers[i].ticker;
//     //   fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/quote/latestPrice?token=${apiCredentials.iex.publishable}`)
//     //   .then(response => response.json())
//     //   .then(
//     //     (data)=>{
//     //       console.log('ticker = ', ticker);
//     //       let date_ob = new Date();
//     //       let date = ("0" + date_ob.getDate()).slice(-2);
//     //       let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
//     //       let year = date_ob.getFullYear();
//     //       let sqlDate = (year+'-'+month+'-'+date);
//     //
//     //       var insertP = [ticker, sqlDate]
//     //       console.log('inserting: ', insertP);
//     //       var query = {
//     //         sql: 'INSERT INTO `MarketData`(`ticker`, `EODDate`) VALUES(?,?)',
//     //         values: insertP
//     //       }
//     //
//     //       mysql.query(query, (error, result)=>{
//     //         console.log('result = ', result);
//     //       });
//     //     }
//     //   );
//     //
//     // }
//   });
// }

// cacheEODStockQuotes((error, data)=>{
// });
