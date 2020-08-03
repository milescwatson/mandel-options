import React from 'react';
import { Navbar } from 'react-bootstrap';

import globals from './include/globals.js';
var LoginPage = function(){

  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          {globals.siteName}
        </Navbar.Brand>
      </Navbar>

      <h3>Login</h3>

      <form method="POST" action="/login">
        <div className="form-group">
          <label htmlFor="pw">Password: </label>
          <input name="password" type="password" className="form-control" id="pw" placeholder="Password" required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </React.Fragment>

  );
}


export default LoginPage;
