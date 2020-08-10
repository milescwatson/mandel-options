import React from 'react';
import Header from './Header.js';
import StrategyItem from './StrategyItem';

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
      strategyItemComps: []
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
        mFetch.getText('/health', (error, result)=>{
          if(result !== '1'){
            this.setState({loginStatus: false})
          }
        });
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

  }.bind(this);

  AppOrLogin = function(){
    if(this.state.loginStatus){
      return (
        <React.Fragment>
          <Header />

          <div className="app">
            <h1>Strategies</h1>
            {(this.state.strategiesLoaded ? (this.state.strategyItemComps) : (<h5>Loading strategies...</h5>))}
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
