import React, { useState, useEffect } from 'react';
import fetchMonthOfData from './include/fetchMonthOfData';
import StrikeDate from './StrikeDate';

// var mFetch = require('../include/mFetch');

/*
<StrikeSelector />
  <StrikeDate />
    <OptionChain />
      <StrikeRow />
  .   .
  .   .
  .   .
  .   .
  .   .
*/

var StrikeSelector = function(props){
  const [marketData, setMarketData] = useState({});
  const [strikesLoaded, setStrikesLoaded] = useState(false);

  var fetchMarketData = function(){
    fetchMonthOfData(props, function(error, result){
      if(error){
      }else{
        setMarketData(result)
        setStrikesLoaded(true);
      }
    });
  }
  useEffect(fetchMarketData, [props.strikeMonth])

  if(strikesLoaded){
    return (
      <React.Fragment>
        {marketData.uniqueStrikeDates.sort().map(function(value, idx){
          return(
            <StrikeDate
              key = {idx}
              date = {value}
              marketData = {marketData}
              price = {props.price}
            />
          )
        })}
      </React.Fragment>
    )
  }else{
    return (
      <React.Fragment>
        {(strikesLoaded ? (<p>Loading Strike Dates...</p>) : (<p>Select an Expiration Month</p>))}
      </React.Fragment>
    )
  }
}

export default StrikeSelector;
