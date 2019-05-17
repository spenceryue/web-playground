import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Year from './components/Year';
import Week from './components/Week';
import Quarter from './components/Quarter';

ReactDOM.render(
  <div>

  <Year 
    year={2001}
  />

  <Year
    year={2002}
  />

  <Quarter
    date={new Date()}
  />

  <Week
  />

  </div>
,

  document.getElementById('root'));
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
