import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './include/css/universal.css';
import App from './App';
import LoginPage from './LoginPage';
var xhr = require('./include/xhr');

if(window.location.pathname === '/login'){
  ReactDOM.render(
    <React.StrictMode>
      <LoginPage />
    </React.StrictMode>,
    document.getElementById('root')
  );
}else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
