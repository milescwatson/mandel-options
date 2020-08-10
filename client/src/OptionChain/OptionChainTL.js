import '../include/css/OptionChain.css'
import React, { useState, useEffect } from 'react';
import ExpirationSelector from './ExpirationSelector';
import StrikeSelector from './StrikeSelector';
var mFetch = require('../include/mFetch');

// var mFetch = require('../include/mFetch');

// var moment = require('moment');
// var mFetch = require('../include/mFetch');

var OptionChainTL = function(props){
  const [strikeMonth, changeStrikeMonth] = useState(null);
  const [hasOptions, changeHasOptions] = useState(false);

  var checkOptions = function(){

    if(props.symbol.length >= 1 && props.symbol !== undefined){
      mFetch.getTextJSON(`/has-options/${props.symbol}`, function(error, result){
        if(result === true){
          changeHasOptions(true)
        }
      });
    }
  }
  useEffect(checkOptions, [props.symbol])

  if (hasOptions){
    return (
      <React.Fragment>
        <div className="optionChain">
          <ExpirationSelector
            symbol = {props.symbol}
            changeStrikeMonth = {changeStrikeMonth}
          />
          <br />
          <StrikeSelector
            strikeMonth = {strikeMonth}
            symbol = {props.symbol}
            price = {props.price}
          />
        </div>
      </React.Fragment>
    );
  }else{
    return(
      <h5>{props.symbol} does not have options.</h5>
    )
  }
}

export default OptionChainTL;
