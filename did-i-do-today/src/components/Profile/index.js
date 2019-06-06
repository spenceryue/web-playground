import React, { Component } from 'react';

import Week from  '../Calendar/Week'
import Quarter from  '../Calendar/Quarter'
import Year from  '../Calendar/Year'
import { withFirebase } from  '../Firebase'
import StringHash from 'string-hash';

class Profile extends Component {
  constructor (props) {
    super(props);
    const date = new Date();

  }

  render() {
    return (
      <div>
        <div>
          Did I Make Progress On Did I Do Today?
        </div>
        <p/>
        <Week dateIsStart={false} />
        <Quarter dateIsStart={false} />
        <Year dateIsStart={false} />
      </div>
    );
  }
}

export default withFirebase(Profile);
