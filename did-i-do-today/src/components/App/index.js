import React from 'react';

import LandingPage from '../Landing';
import LoginPage from '../Login';
import TestPage from '../Test';
import Test2Page from '../Test2';
import AnswersPage from '../Answers';

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
      <Route exact path={ROUTES.TEST} component={TestPage} />
      <Route exact path={ROUTES.ANSWERS} component={AnswersPage} />
      <Route exact path={ROUTES.TEST2} component={Test2Page} />
    </div>
  </Router>
);

export default App;
