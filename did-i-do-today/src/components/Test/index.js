import React from 'react';

import Questions from '../Questions';
import BasicExample from '../FormikApiExample';

import { withAuthorization } from '../Session';

const TestPage = () =>
(
  <div>
  <Questions/>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(TestPage);
