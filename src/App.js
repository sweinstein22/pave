import React from 'react';
import {connect} from 'react-redux';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Starter App</h1>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (() => {
  return {}
});

export default connect(mapStateToProps)(App);
