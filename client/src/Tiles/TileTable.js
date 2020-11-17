import '../include/css/tileStyle.css';
import React, { useState, useEffect } from 'react';
import { } from "@blueprintjs/core";
import { Table } from 'react-bootstrap';
import OptionChainTL from '../OptionChain/OptionChainTL';
var async = require('async');

var moment = require('moment');
var mFetch = require('../include/mFetch');

var TileTable = function(){
  // const [tileData, setTileData] = useState({})
  const [tableSettings, setTableSettings] = useState({
    cols: 12,
  })

  const [uniqueSymbols, setUniqueSymbols] = useState(null);
  const [longestRow, setLongestRow] = useState(0);

  var handleSetLongestRow = function(val){
    if(val > longestRow){
      setLongestRow(val)
    }
  }

  var getUniqueSymbols = function(){
    mFetch.getTextJSON('/get-unique-symbols', function(error, result){
      if(!error){
        setUniqueSymbols(result.result);
      }
    });
  }
  useEffect(getUniqueSymbols, [])

  var TickerTrend = function(props){
    const [tickerLoaded, setTickerLoaded] = useState(false);
    const [trendData, setTrendData] = useState({});

    const ticker = props.ticker;

    var getTickerTrendData = function(){
      try {
        mFetch.getTextJSON(`/get-tiles/${ticker}`, function(error, result){
          if(!error){
            const tile = result.result;
            if(tile !== undefined && Object.keys(tile).length !== 0){
              handleSetLongestRow(Object.keys(tile).length)
              setTrendData(tile);
              setTickerLoaded(true);
            }else{
              setTickerLoaded(false);
            }
          }else{
            console.log('Load tile error = ', error);
          }
        })
      } catch (e) {
        console.log('getTickerTrendData error: ', e);
      }
    }

    useEffect(getTickerTrendData, [uniqueSymbols])

    var FirstRow = function(){
      var tickerStyle = {
      }
      return(
        <React.Fragment>
          <React.Fragment>
            {['ticker',...Object.keys(trendData), ...(new Array( (((longestRow - (Object.keys(trendData).length)) > 0) ? (longestRow - (Object.keys(trendData).length)) : 0) ).fill('blank'))].map(function(value, key){
              if(value === 'ticker'){
                return((<td className="tickerLabel" style={tickerStyle} key={key}></td>))
              }else if(value === 'blank'){
                return(<td className="noBorder" key={key}></td>)
              }else{
                return(<td key={key}>{moment(value).format("M-D-YY h:m")}</td>)
              }
            })}
          </React.Fragment>
        </React.Fragment>
      )
    }

    var SecondRow = function(){
      // var trendData = tileData[props.ticker];
      var tickerStyle = {
      }

      var getColor = function(color){
        var ret;
        switch (color) {
          case 'green':
            ret = "#93C47D"
            break;
          case 'red':
            ret = "#DF6666"
            break;
          case 'yellow':
            ret = "#FFD966"
            break;
        }
        return{
          "backgroundColor": ret
        }
      }

      return(
        <React.Fragment>
          {['ticker',...Object.keys(trendData), ...(new Array( (((longestRow - (Object.keys(trendData).length)) > 0) ? (longestRow - (Object.keys(trendData).length)) : 0) ).fill('blank'))].map(function(value, key){
            if(value === 'ticker'){
              return(<td className="tickerLabel" style={tickerStyle} key={key}><h5>{props.ticker}</h5><p>Triggered at ${(trendData[Object.keys(trendData)[1]].initPrice).toFixed(2) }</p></td>)
            }else if(value === 'blank'){
              return(<td className="noBorder" key={key}></td>)
            }else{
              return(<td style={getColor(trendData[value].color)} key={key}></td>)
            }
          })}
        </React.Fragment>
      )
    }

    if(tickerLoaded){
      return(
        <React.Fragment>
          <Table size="sm" borderless={true}>
            <tbody>
              <tr>
                <FirstRow />
              </tr>
              <tr>
                <SecondRow />
              </tr>
            </tbody>
          </Table>
        </React.Fragment>
      )
    }
    else{
      return(
        <p></p>
      )
    }
  }

  var GenerateTickers = function(){
    return(
      <>
      {uniqueSymbols.map(function(value, key){
        return(
          <React.Fragment key={key}>
            <TickerTrend
              ticker={value}
            />
          </React.Fragment>
        )
      })}
      </>
    )
  }

  if(uniqueSymbols === null){
    return(
      <h3>Loading Tiles...</h3>
    )
  }else{
    return(<GenerateTickers />)
  }
}

export default TileTable;
