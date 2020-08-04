// used to access option market data api
var apiCredentials = require('./include/apiCredentials'),
    fetch = require('node-fetch');

var getHumanCompanyName = function(request, response){
  var symbol = request.query.symbol;
  fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${apiCredentials.iex.publishable}`)
  .then(response => response.json())
  .then(
    data =>(
      response.send(`{companyName: ${data.companyName},sector: ${data.sector}}`)
    )
  );
}

var getOptionChain = function(){

}

var isOptionDataAvailable = function(){

}

exports.getHumanCompanyName = getHumanCompanyName;
