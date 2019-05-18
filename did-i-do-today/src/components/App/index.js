import React from 'react';

import LandingPage from '../Landing';
import LoginPage from '../Login';

import
{
  BrowserRouter as Router,
  Route
}
from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <div>
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.LOGIN} component={LoginPage} />
    </div>
  </Router>
);

export default App;
