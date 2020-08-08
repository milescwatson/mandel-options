import React from 'react';
import { Navbar, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import globals from './include/globals.js';

var xhr = require('./include/xhr')

var logout = function(){
  xhr.json('/logout', 'GET',{},()=>{
  });
  window.location = '/';
}

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
            >
            <Dropdown.Item eventKey="2" onClick={()=>{logout()}}>Logout</Dropdown.Item>

            </DropdownButton>
          </Navbar.Collapse>

        </Navbar>
    </React.Fragment>
  )
}

export default Header;
