import React, { Component } from 'react';

import Week from  '../Calendar/Week'
import { withFirebase } from  '../Firebase'

class Profile extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          Did I Make Progress On Did I Do Today?
        </div>
        <p/>
        <Week trailing={false} />
      </div>
    );
  }
}

export default withFirebase(Profile);
