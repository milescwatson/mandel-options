import React, { useState, useEffect } from 'react';
import './include/css/StrategyItem.css';
import { Icon } from "@blueprintjs/core"
import UnderlyingItem from './UnderlyingItem';

var mFetch = require('./include/mFetch');


var StrategyItem = function(props){
  const [expanded, changeExpanded] = useState(false);
  const [underlyingComps, setUnderlyingComps] = useState([]);

  var generateUnderlying = function(){
    var ret = [];
    // get all ids, if id is in the assoc ids prop, then render it
    mFetch.getTextJSON('/get-strategy-ids', (error, response)=>{
      if(!error){

        for (var i = 0; i < response.length; i++) {
          if(props.assocKeys.includes(response[i])){
            ret.push(
              <UnderlyingItem
                key={i}
                id = {response[i]}
              />
            )
          }
        }
        setUnderlyingComps(ret)
      }
    });
  }
  
  useEffect(generateUnderlying, [props]);

  var expandedContentDynamicStyle = {
    display: (expanded ? '' : 'none')
  }

  var headerStyle = {
    "borderBottomLeftRadius": (expanded ? '0' : '2px'),
    "borderBottomRightRadius": (expanded ? '0' : '2px')
  }


  return(
  <React.Fragment>
    <div className="StrategyItem">
      <div style={headerStyle} className="strategyItemHeader" onClick={()=>{changeExpanded(!expanded)}}>
        <h5 className="stratTitle">{props.strategyTitle.split('$$_')[1].toUpperCase()}</h5>
        <Icon className="toggleButton" icon={ expanded ? 'chevron-up' : 'chevron-down'} intent={"primary"} iconSize={30} />
      </div>
      <div className="expandedContentS" style={expandedContentDynamicStyle}>
        {underlyingComps}
      </div>
    </div>
  </React.Fragment>
  )
}

export default StrategyItem;
