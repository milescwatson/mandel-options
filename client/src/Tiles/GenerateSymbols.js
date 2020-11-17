import React, { useState, useEffect } from 'react';
import '../include/css/StrategyItem.css';
import { Icon } from "@blueprintjs/core";
import UnderlyingItemTile from './UnderlyingItemTile';

var mFetch = require('../include/mFetch');

var StrategyItem = function(props){
  const [expanded, changeExpanded] = useState(false);
  const [underlyingComps, setUnderlyingComps] = useState([]);

  var generateUnderlying = function(){
    var ret = [];
    // get all ids, if id is in the assoc ids prop, then render it
    mFetch.getTextJSON('/get-strategy-ids', (error, response)=>{
      if(!error){
        for (var i = 0; i < response.length; i++) {
          ret.push(
            <UnderlyingItemTile
              key={i}
              id = {response[i]}
            />
          )
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
    {underlyingComps}
  </React.Fragment>
  )
}

export default StrategyItem;
