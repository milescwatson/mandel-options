import React from 'react';
import Header from './Header.js';
import StrategyItem from './StrategyItem';
import { Tab, Tabs } from "@blueprintjs/core";
import GenerateSymbols from './Tiles/GenerateSymbols';
import TileTable from './Tiles/TileTable';

import LoginPage from './LoginPage';

var xhr = require('./include/xhr');
var mFetch = require('./include/mFetch');

class App extends React.Component {
  constructor(props){
    super(props);
    var initialState = {
      strategyArray: [],
      strategiesLoaded: false,
      loginStatus: false,
      strategyItemComps: [],
      mode: 'tile'
    }
    this.state = initialState;
  }

  checkLoginStatus = function(){
    xhr.json('/login-status', 'GET', {}, function(error, response){
        var res;
        try {
          res = JSON.parse(response);
          if(res.status === 1){
            this.setState({loginStatus: true})
          }else{
            this.setState({loginStatus: false})
          }
        } catch (e) {
          this.setState({loginStatus: false})
        }
        // mFetch.getText('/health', (error, result)=>{
        //   if(result !== '1'){
        //     this.setState({loginStatus: false})
        //   }
        // });
    }.bind(this))
  }.bind(this);

  generateStrategyItems = function(){
    var ret = [];

    mFetch.getTextJSON('/get-unique-strategy-ids', (error, response)=>{
      if(!error){
        for (var i = 0; i < Object.keys(response).length; i++) {
          var assocKeys = response[Object.keys(response)[i]];
          ret.push(
            <StrategyItem
              key= {i}
              strategyTitle = {Object.keys(response)[i]}
              assocKeys = {assocKeys}
            />
          )

        }
        this.setState({
          strategyItemComps: ret,
          strategiesLoaded: true
        });
      }
    });
  }

  componentDidMount = function(){
    this.checkLoginStatus();
    // this.getStrategies();
    this.generateStrategyItems();
    // setInterval(this.generateStrategyItems, 5000);
  }.bind(this);

  handleTabChange = function(newTab){
    this.setState({
      mode: newTab
    })
  }.bind(this);

  AppAlt = function(){
    return(
      <>
      <h1>Strategies</h1>
      {this.state.mode === 'main' ? ((this.state.strategiesLoaded ? (this.state.strategyItemComps) : (<h5>Loading strategies...</h5>))) : ''}
      </>
    )
  }.bind(this)

  TileMode = function(){
    return(
      <>
      <h1>Tile Trend</h1>
      <TileTable />
      </>
    )
  }

  AppOrLogin = function(){
    if(this.state.loginStatus){
      return (
        <React.Fragment>
          <Header />

          <div className="app">
            <Tabs large={true} onChange={this.handleTabChange} selectedTabId={this.state.mode} className="modeChangeTabs">
                <Tab id="tile" title="Tile Trend" panel={<this.TileMode />} />
                <Tab id="main" title="Main" panel={<this.AppAlt />} />
            </Tabs>
          </div>

        </React.Fragment>
      );
    }else{
      return(
        <LoginPage />
      )
    }
  }.bind(this);

  render() {
    return(
      <this.AppOrLogin />
    )
  }
}

export default App;
