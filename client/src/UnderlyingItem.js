import './include/css/UnderlyingItem.css'
import React, { useState, useEffect } from 'react';
import { Icon } from "@blueprintjs/core"
import { Button } from 'react-bootstrap';
import OptionChainTL from './OptionChain/OptionChainTL';
import Table from 'react-bootstrap/Table';
var moment = require('moment');
var mFetch = require('./include/mFetch');

function UnderlyingItem(props) {
  // MODEL

  const [expanded, changeExpanded] = useState(false);
  const [deleted, deleteItem] = useState(false);
  const [info, setInfo] = useState({
    ticker: '',
    direction: '',
    createdDateTime: '',
    strategyTitle: '',
    price: '',
    desc: '',
    change: ''
  });

  var getUnderlyingInfo = function(){
    if(props.id !== undefined){
      mFetch.getTextJSON(`/get-underlying-info/${props.id}`, function(error, response){
        if(!error){
          setInfo({
            ticker: response.symbol,
            direction: response.strategyDirection,
            createdDateTime: response.createdDateTime,
            strategyTitle: response.strategyParsedText,
            companyName: response.companyName,
            change: parseFloat(response.change).toFixed(2),
            price: parseFloat(response.price).toFixed(2)
          });
        }
      });
    }
  }

  useEffect(getUnderlyingInfo, [props.id]);

  var QuoteHistory = function(props){
    const [historicalLoaded, setHistoricalLoaded] = useState(false);
    const [marketData, setMarketData] = useState(null);
    var stockHistory = function(){
      return(
        <>
        <h5>Quote History </h5>
        <Table>
          <tr>
            <td>Date</td>
            <td>Price</td>
          </tr>
        </Table>
        </>
      )
    }
    var getMarketData = function(){
      if(props.symbol !== undefined){
        mFetch.getTextJSON(`/get-historical/${props.symbol}`, function(error, result){
          setMarketData(result);
          setHistoricalLoaded(true);
        });
      }
    }

    useEffect(getMarketData, [props.symbol])

    if(historicalLoaded){
      return(
        <>
        <h5>Quote History</h5>
        <p>Market data pulled at 4:05PM every weekday.</p>
        </>
      )
    }else{
      return(
        <>
        <h5>Quote History</h5>
        <p>Loading Historical Data</p>
        </>
      )
    }
  }

  var Ticker = function(props){
    // var symbolDescription = {
    //   display: "block",
    //   width: "280px",
    //   color: "red"
    // }

    var FormatChangeAndPrice = function(){
      var style = {};
      var prefix = '';
      if(info.change > 0){
        style.color = "lightgreen";
        prefix = "+";
      }else{
        style.color = "#D93D4A";
      }
      return(
        <>
        <h5 style={style}> {info.price} </h5>
        <p style={style}>{prefix} {info.change}</p>
        </>
      )
    }

    return(
      <div className="Ticker">
        <div className="title">
          <h5 className="tickerFont"><b>{info.ticker}</b></h5>
          <p className= "companyDescription"> {info.companyName} </p>
        </div>

        <div className="priceInfo">
          <FormatChangeAndPrice />
        </div>

      </div>
    )
  }

  var deleteUnderlying = function(){
    fetch(`/delete-strategy/${props.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((res) => {
      deleteItem(true);
    })
  }

  // VIEW
  var directionStyle = {
    "float": 'right',
    'marginRight': '5%'
  }
  switch (info.direction) {
    case 'bullish':
      directionStyle.color = 'lightgreen';
      break;
    case 'bearish':
      directionStyle.color = '#D93D4A';
      break;
    default:
      break;
  }

  var formatDate = function(){
    return(moment(info.createdDateTime, "YYYY-MM-DD HH:mm:ss").format('M/D, h:mma').toString())
  }

  var expandedContentDynamicStyle = {
    display: (expanded ? '' : 'none')
  }
  var headerStyle = {
    "borderBottomLeftRadius": (expanded ? '0' : '2px'),
    "borderBottomRightRadius": (expanded ? '0' : '2px')
  }

  var deleteStyle = {
    'display': (deleted ? 'none' : '')
  }

  return(
    <React.Fragment>
      <div className="UnderlyingItem" style={deleteStyle}>
        <div style={headerStyle} className="underlyingItemHeader" onClick={()=>{changeExpanded(!expanded)}}>
          <Ticker
            symbol = {info.ticker.toUpperCase()}
          />
          <Icon className="toggleButton" icon={ expanded ? 'chevron-up' : 'chevron-down'} intent={"primary"} iconSize={30} />
          <h5 style={directionStyle}>{(info.direction.toUpperCase() === 'BULLISH') || (info.direction.toUpperCase() === 'BEARISH') ? info.direction.toUpperCase() : ''}</h5>
          <h5 className="time">{formatDate()}</h5>
        </div>
        <div className="expandedContentU" style={expandedContentDynamicStyle}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-9">
                <OptionChainTL
                  symbol= {info.ticker}
                  price= {info.price}
                />
              </div>
              <div className="col-3">
                <h5> Alert Details</h5>
                <Button variant="primary" target="_blank" href={`http://www.tradingview.com/symbols/${info.ticker}`}>TradingView Quote</Button>
                <Button className="deleteButton" variant="danger" onClick={() => {deleteUnderlying()}}>Delete This Alert</Button>
                <QuoteHistory
                  symbol={info.ticker}
                />
              </div>
            </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default UnderlyingItem;
