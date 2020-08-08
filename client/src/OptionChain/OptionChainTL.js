import '../include/css/OptionChain.css'
import React, { useState } from 'react';

import ExpirationSelector from './ExpirationSelector';
import StrikeSelector from './StrikeSelector';

// var moment = require('moment');
// var mFetch = require('../include/mFetch');

var OptionChainTL = function(props){
  const [strikeMonth, changeStrikeMonth] = useState(null);

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
}

export default OptionChainTL;
