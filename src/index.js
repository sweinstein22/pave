import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createTheme, MuiThemeProvider} from '@material-ui/core/styles';
import store from './ReduxStore'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={darkTheme}>
    <Provider {...{store: store.getStore()}}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
