import React, { Component } from 'react';

import Week from  '../Calendar/Week'
import Quarter from  '../Calendar/Quarter'
import Year from  '../Calendar/Year'

class Test3Page extends Component {
  constructor (props) {
    super(props);
    const date = new Date();

    this.state = {
      data: JSON.parse(localStorage.getItem('myData'))
    };
  }

  randomTrue() {
    let num = Math.random();
    if (num > 0.5)
    {
      return true;
    }
    return false;
  }

  renderSubmit() {
    let today = new Date();
    let lastDate = new Date(JSON.parse(localStorage.getItem('lastDateSubmitted')));

    if (today.getDate() === lastDate.getDate() ||
        today.getMonth() === lastDate.getMonth() ||
        today.getYear() === lastDate.getYear())
    {
    }
    else
    {
      return (
        <button onClick={() => {
          localStorage.setItem('myData', JSON.stringify([
            this.randomTrue(),
            this.randomTrue(),
            this.randomTrue(),
            this.randomTrue(),
            this.randomTrue(),
            this.randomTrue(),
            this.randomTrue()
          ]));

          localStorage.setItem('lastDateSubmitted', JSON.stringify(new Date()));

        }}>
          hello
        </button>
      );
    }
  }

  render() {
    return (
      <div>
        <div>
          Did I Make Progress On Did I Do Today?
        </div>
        {this.renderSubmit()}
        <p/>

        <Week dateIsStart={false} data={this.state.data} />

        <Quarter dateIsStart={false} />
        <Year dateIsStart={false} />
      </div>
    );
  }
}

export default Test3Page;

