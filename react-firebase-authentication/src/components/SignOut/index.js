import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button 
    type='button'
    onClick={async () => {
      firebase.doSetQuestions(['hellow'],'gtang.gt');
      firebase.doGetQuestions('gtang.gt');
      firebase.doSignOut();
    }
    }>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
