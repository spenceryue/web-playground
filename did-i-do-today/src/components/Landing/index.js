import React from 'react';

import Profile from '../Profile';
import SignOutButton from '../Logout';

const LandingPage = () =>
(
  <div>

      <input type='date'/>
      <input type='submit'/>

    <Profile/>
    <SignOutButton/>

  </div>
);

export default LandingPage;
