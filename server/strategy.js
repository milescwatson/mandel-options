var mysql = require('./include/mysqlQueryExecutor');

var deleteStrategy = function(request, response){
  const id = request.params.id;
  const query = {
    sql: 'DELETE FROM `Strategies` WHERE `id`=?',
    values: [id]
  }
  mysql.query(query, function(error, result){
    // console.log('error, ', error);
    // console.log('result, ', result);
  });
  response.send('1');
}

var getStrategyIDs = function(request, response){
  const query = {
    sql: 'SELECT id FROM Strategies ORDER BY `createdDateTime` ASC'
  }
  mysql.query(query, function(error, result){
    if(error){
      response.send('error');
    }
    if(result.length > 0){
      var ret = []
      for (var i = 0; i < result.length; i++) {
        ret.push(result[i].id)
      }

      response.send(JSON.stringify(ret));
    }else{
      response.send('[]');
    }
  });
}
// For indivual comp API Calls, we need:
// ticker = {'aapl'}
// direction = {'bearish'}
// createdDateTime = {'2020-08-03 23:15:59'}

var getUniqueStrategies = function(request, response){
  // unique strategy title, accompanied by list of strategies that share that title
  const query = {
    sql: 'SELECT `id`, `strategyParsedText` FROM `Strategies`'
  }
  mysql.executeQueryWithConnect(query, function(error, result){
    if(error){
      response.send(error)
    }else{
      var uniqueStrategies = {};
      for (var i = 0; i < result.length; i++) {
        if(!Object.keys(uniqueStrategies).includes(result[i].strategyParsedText)){
          uniqueStrategies[result[i].strategyParsedText] = []
        }
      }

      for (var i = 0; i < result.length; i++) {
        var strategyTitleItr = result[i].strategyParsedText;
        if(uniqueStrategies[strategyTitleItr] !== 'undefined'){
          uniqueStrategies[strategyTitleItr].push(result[i].id);
        }
      }
      
      response.send(JSON.stringify(uniqueStrategies));
    }
  });

}

exports.deleteStrategy = deleteStrategy;
exports.getStrategyIDs = getStrategyIDs;
exports.getUniqueStrategies = getUniqueStrategies;
