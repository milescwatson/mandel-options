import React, { useState } from 'react';
import OptionChain from './OptionChain.js';
import { Icon } from "@blueprintjs/core"

var moment = require('moment');

var StrikeDate = function(props){
  const [expanded, changeExpanded] = useState(false);
  var expandedContentDynamicStyle = {
    display: (expanded ? '' : 'none')
  }

  return(
    <React.Fragment>
      <div className="strikeContainer">
        <div className="strikeHeader" onClick={()=>{changeExpanded(!expanded)}}>
          <Icon className="toggleButton" icon={ expanded ? 'chevron-up' : 'chevron-down'} intent={"primary"} iconSize={24} />
          <p>{moment(props.date, "YYYYMMDD").format("MMM D, YYYY")}</p>
        </div>

        <div className="expandedContentChain" style={expandedContentDynamicStyle} >
          <OptionChain
            marketData = {props.marketData}
            date = {props.date}
            price = {props.price}
          />
        </div>

      </div>

    </React.Fragment>
  )
}

export default StrikeDate;
