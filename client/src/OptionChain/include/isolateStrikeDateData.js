var isolateStrikeDateData = function(marketDataObj, selectedDate, callback){
  var putOptions = [];
  var callOptions = [];
  var marketData = marketDataObj.marketData;

  for(var i = 0; i<marketData.length;i++){
    if(marketData[i].expirationDate === selectedDate){
      var selected = {
        strikePrice: marketData[i].strikePrice,
        closingPrice: marketData[i].closingPrice,
        volume: marketData[i].volume,
        openInterest: marketData[i].openInterest,
        bid: marketData[i].bid,
        ask: marketData[i].ask,
        lastUpdated: marketData[i].lastUpdated
      }

      if(marketData[i].side === "call"){
        callOptions.push(selected);
      }
      if(marketData[i].side === "put"){
        putOptions.push(selected);
      }
    }
  }

  putOptions.sort(function(a, b){
    return(a.strikePrice - b.strikePrice)
  });
  callOptions.sort(function(a, b){
    return(a.strikePrice - b.strikePrice)
  });

  callback(null, generateChain(callOptions, putOptions));
}

var generateChain = function(calls, puts){
  var optionChain = {};

  for(var i = 0; i < calls.length; i++){
    optionChain[calls[i].strikePrice] = {};
    optionChain[calls[i].strikePrice].callSide = calls[i];
  }
  for(i = 0; i < puts.length; i++){
    if(optionChain[puts[i].strikePrice] === 'undefined'){
      optionChain[puts[i].strikePrice] = {};
    }else{
      optionChain[puts[i].strikePrice].putSide = puts[i];
    }
  }
  return(optionChain);
}

// isolateStrikeDateData(testData, "20200814", (error, result)=>{
//   console.log(result.puts)
// });
export default isolateStrikeDateData
