import React, { Component } from 'react';

import Week from  '../Calendar/Week'
import Quarter from  '../Calendar/Quarter'
import Year from  '../Calendar/Year'

class Test3Page extends Component {
  constructor (props) {
    super(props);
    const date = new Date();

    console.log(localStorage.setItem('myData', Math.random()));
    console.log(localStorage.getItem('myData'));
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

export default Test3Page;

