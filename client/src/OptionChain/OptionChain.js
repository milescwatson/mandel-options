import '../include/css/OptionChain.css';
import isolateStrikeDateData from './include/isolateStrikeDateData';
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

/*
table
  header
  rows
*/

var OptionChain = function(props){
  const [displaySettings, setDisplaySettings] = useState({
    calls: true,
    puts: true,
    metrics: ['closingPrice', 'bid', 'ask', 'volume'],
    marketDataReady: false
  });
  const [marketData, setMarketData] = useState([])

  var storeMarketData = function(){
    isolateStrikeDateData(props.marketData, props.date, function(error, result){
      setMarketData(result);
      var wds = displaySettings;
      wds.marketDataReady = true;
      setDisplaySettings(wds);
    });
  };
  useEffect(storeMarketData, [props.marketData]);

  var TableHeader = function(){
    return(
      <thead>
        <tr className="labelNoBorder">
          {[displaySettings.calls].map((metric, index)=>{
            if(displaySettings.calls){
              return(<td key="index" colSpan={4}><b>Calls</b></td>)
            }else{
              return ''
            }
          })}
          <td></td>
          {[displaySettings.puts].map((metric, index)=>{
            if(displaySettings.puts){
              return(<td key="index" colSpan={4}><b>Puts</b></td>)
            }else{
              return ''
            }
          })}
        </tr>
        <tr>
          {
            displaySettings.metrics.map((metric, index)=>{
              if(displaySettings.calls){
                return(<td key={index}>{metric}</td>)
              }else{
                return ''
              }
            })
          }
          <td><b>Strike Price</b></td>
          {
            displaySettings.metrics.map((metric, index)=>{
              if(displaySettings.puts){
                return(<td key={index}>{metric}</td>)
              }else{
                return ''
              }
            })
          }
        </tr>
      </thead>
    )
  }
  var generateStyle = function(strikePrice, side){
    var style = {};
    if(side === "calls"){
      if(strikePrice < props.price){
        style["backgroundColor"] = "rgb(175 175 175)";
      }
    }

    if(side === "puts"){
      if(strikePrice > props.price){
        style["backgroundColor"] = "rgb(175 175 175)";
      }
    }

    return(style);
  }
  var TableBody = function(){
    return(
      <tbody>
      {Object.keys(marketData).sort().map(function(strikePrice, strikeRowIdx){
        return(
          <tr key = {strikeRowIdx}>
            {
            displaySettings.metrics.map(function(metric, metricIdx){
              if(displaySettings.calls){
                return(
                  <td key={'c_'+metricIdx} style={generateStyle(strikePrice, "calls")}> {marketData[strikePrice].callSide[metric].toFixed(2)}</td>
                )
              }else{
                return ''
              }
            })
            }
            <td>{strikePrice}</td>
            {
            displaySettings.metrics.map(function(metric, metricIdx){
              if(displaySettings.puts){
                return(
                  <td key={'p_'+metricIdx} style={generateStyle(strikePrice, "puts")}>{marketData[strikePrice].putSide[metric].toFixed(2)}</td>
                )
              }else{
                return ''
              }
            })
            }
          </tr>
        )
      })}
      </tbody>
    )
  }

  if(displaySettings.marketDataReady){
    return(
      <React.Fragment>
        <Table size='sm' responsive bordered>
          <TableHeader />
          <TableBody />
        </Table>

      </React.Fragment>
    )
  }else {
    return(
      <p>Loading Market Data...</p>
    )
  }
}

export default OptionChain;
