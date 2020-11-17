var fetch = require('node-fetch');

var getText = function(url, callback){
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain'
    }
  })
  .then((response)=>response.text())
  .then(function(response){
    callback(null, response)
  })
  .catch(function(error){
    callback(error, null)
  });
}
var getTextJSON = function(url, callback){
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain'
    }
  })
  .then((response)=>response.json())
  .then(function(response){
    callback(null, response)
  })
  .catch(function(error){
    callback(error, null)
  });
}

// var getCachedJSON = function(baseURL, urlQueries, timeToSave){
//
// }

exports.getText = getText;
exports.getTextJSON = getTextJSON;
