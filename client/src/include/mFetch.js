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
var json = function(callback){

}

exports.getText = getText;
exports.json = json;
exports.getTextJSON = getTextJSON;
