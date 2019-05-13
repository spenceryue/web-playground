import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Year from './components/Year';

ReactDOM.render(<Year 
  year={2001}
  />,

  document.getElementById('root'));
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
