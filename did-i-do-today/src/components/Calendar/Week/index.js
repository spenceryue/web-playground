import React, { Component } from 'react'
import Gradient from '../Gradients';
import Day from '../Day';
import './style.css'

class Week extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      date : new Date(),
    };
  }

  createDays = () => {
    let ret = [];
    let date = this.state.date;
    date.setDate(date.getDate() - 6);

    for (let i = 0; i < 7; i++)
    {
      ret.push(
        <Day date={new Date(date)}/>
      );

      date.setDate(date.getDate() + 1);
    }

    return ret;
  }

  render() {
    return <div>
      {this.createDays()}
    </div>;
  }
}

export default Week;

