var mFetch = require('../../include/mFetch');
var fetchMonthOfData = function(props, callback){
  if(props.strikeMonth !== null){
    mFetch.getTextJSON(`/get-data-by-month/${props.symbol}/${props.strikeMonth}`, (error, marketDataJSON)=>{
      if(error){
        callback(error, null)
      }else{
        var uniqueStrikeDates = [];
        for (var i = 0; i < marketDataJSON.length; i++) {
          var dateItr = marketDataJSON[i].expirationDate;
          var isUnique = true;
          for(var j = 0; j < uniqueStrikeDates.length; j++){
            if(uniqueStrikeDates[j] === dateItr){
              isUnique = false;
            }
          }
          if(isUnique){
            uniqueStrikeDates.push(dateItr)
          }
        }
        // var retMoments = [];
        // for(var i = 0; i < uniqueStrikeDates.length; i++){
        //   retMoments[i] = new moment(uniqueStrikeDates[i], "YYYYMMDD");
        // }

        callback(null, {
          uniqueStrikeDates: uniqueStrikeDates,
          marketData: marketDataJSON
        });

        // var wds = displaySettings;
        // wds.strikeDatesMoment = retMoments;
        // wds.marketDataLoaded = true;
        // wds.marketDataComplete = marketDataJSON;
        // setDisplaySettings(wds);
        // genVisualStrikeDates();
      }
    });
  }
}
export default fetchMonthOfData;
