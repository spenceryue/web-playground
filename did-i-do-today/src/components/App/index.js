import React from 'react';

import LandingPage from '../Landing';
import GeorgeLandingPage from '../GeorgeLanding';
import LoginPage from '../Login';
import LoginAnimatedPage from '../LoginAnimated';
import TestPage from '../Test';
import Test2Page from '../Test2';
import Test3Page from '../Test3';
import AnswersPage from '../Answers';
import QuestionsPage from '../Questions';
import NotFoundPage from '../NotFound';
import SurveyPage from '../Survey';
import EditSurveyPage from '../EditSurvey';

import { withAuthentication } from '../Session';
import
{
  BrowserRouter as Router,
  Route,
  Switch
}
from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <Switch>
      <Route exact path={ROUTES.LANDING} component={GeorgeLandingPage} />
      <Route exact path={ROUTES.QUESTIONS} component={QuestionsPage} />
      <Route exact path={ROUTES.LOGIN} component={LoginPage} />
      <Route exact path={ROUTES.ANSWERS} component={AnswersPage} />
      <Route exact path={ROUTES.SURVEY} component={SurveyPage} />
      <Route exact path={ROUTES.EDITSURVEY} component={EditSurveyPage} />

      <Route exact path={ROUTES.TEST} component={TestPage} />
      <Route exact path={ROUTES.TEST2} component={Test2Page} />
      <Route exact path={ROUTES.TEST3} component={Test3Page} />
      <Route exact path={ROUTES.LOGINANIM} component={LoginAnimatedPage} />
      <Route path='*' component={NotFoundPage} />
    </Switch>
  </Router>
);

export default withAuthentication(App);
