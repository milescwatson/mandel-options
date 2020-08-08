import React, { useState, useEffect } from 'react';
var moment = require('moment');
var mFetch = require('../include/mFetch');


var ExpirationSelector = function(props){
  var [state, setState] = useState({
    strikesLoaded: false,
    strikeMonths: [],
    selectedStrikeMonth: ''
  });
  var esProps = props;

  var Loading = function(){
    return(
      <React.Fragment>
        <>
        <div className="optionChainHeader">
          <h5>Option Chain</h5>
          <p style={{float: "right"}}>Loading expiration months...</p>
        </div>
        </>
      </React.Fragment>
    )
  }

  var MonthSelect = function(props){
    var handleChange = function(event){
      const val = event.target.value;
      var ws = state;
      ws.selectedStrikeMonth = val;
      if(val !== "Select Month:"){
        esProps.changeStrikeMonth(moment(val,"MMM, YYYY").format("YYYYMM").toString());
      }
      setState(ws);
    }

    return(
      <React.Fragment>
        <>
        <div className="optionChainHeader">
          <h5>Option Chain</h5>
          <label className="dateSelect">
            Expiration Month:
            <select value={state.selectedStrikeMonth} onChange={handleChange}>
              <option key={1}>Select Month:</option>

              {
                  state.strikeMonths.map((monthYear, index)=>{
                    return(
                      <option key={index+1} value={monthYear}>{monthYear}</option>
                    )
                  })
              }
            </select>
          </label>
        </div>
        </>
      </React.Fragment>
    )
  }

  var fetchStrikeDates = function(){
    console.log('fetchStrikeDates symbol = ', props.symbol);

    if(props.symbol.length >= 1 && props.symbol !== undefined){
      mFetch.getTextJSON(`/get-strike-dates/${props.symbol}`, function(error, result){
        if(error){
        }else{
          try {
            var sMonths = (result),
                momentObjects = [];
            // get moment dates
            for (var i = 0; i < sMonths.length; i++) {
              momentObjects.push(moment(sMonths[i],"YYYYMM").format("MMM, YYYY").toString());
            }
            setState({strikesLoaded: true, strikeMonths: momentObjects});
          } catch (e) {
            console.log('!error, ', e);
            setState({strikesLoaded: false});
          }
        }
      });
    }
  }

  useEffect(fetchStrikeDates, [props.symbol])

  if(state.strikesLoaded){
    return(
      <>
      <MonthSelect />
      </>
    )
  }else{
    return(
      <Loading />
    )
  }
}
export default ExpirationSelector;
