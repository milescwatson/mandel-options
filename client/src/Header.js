import React, { useState } from 'react';
import { Navbar, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import globals from './include/globals.js';

var xhr = require('./include/xhr')

var logout = function(){
  xhr.json('/logout', 'GET',{},()=>{
  });
  window.location = '/';
}

var checkLoginStatus = function(){
  var loginStatus = 0;
  xhr.json('/login-status', 'GET', {}, function(error, response){
    if(window.location.pathname !== '/login'){
      if(error){
        window.location = '/login?error-auth-req-error';
      }
      const res = JSON.parse(response);
      if(res.status !== 1){
        window.location = '/login?logged-out';
      }
    }

  })
}
checkLoginStatus();

function Header(props){
  return(
    <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">
            {globals.siteName}
          </Navbar.Brand>

          <Navbar.Collapse className="justify-content-end">
            <DropdownButton
              alignRight
              as={ButtonGroup}
              key="Secondary"
              id="dropdown-menu-align-right"
              variant="secondary"
              title={globals.userName}
              id="dropdown-menu-align-right"
            >
            <Dropdown.Item eventKey="1">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="2" onClick={()=>{logout()}}>Logout</Dropdown.Item>

            </DropdownButton>
          </Navbar.Collapse>

        </Navbar>
    </React.Fragment>
  )
}

export default Header;
