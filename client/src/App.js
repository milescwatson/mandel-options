import React from 'react';
import Header from './Header.js';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div class="app">
          <h1>Strategies</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
