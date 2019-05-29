import React, { Component } from 'react'
import Gradient from '../Gradients';
import Day from '../Day';
import './style.css'

class Week extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      date : props.date || new Date(),
      dateIsStart : (props.dateIsStart === undefined) ? true : props.dateIsStart,
      data : props.data || Array.apply(null, Array(7)),
      positive : props.positive || 'Yes',
      negative : props.negative || 'No'
    };
  }

  createDays = () => {
    let ret = [];
    let date = new Date(this.state.date);
    if (!this.state.dateIsStart)
    {
      date.setDate(date.getDate() - 6);
    }

    for (let i = 0; i < 7; i++)
    {
      ret.push(
        <Day
          date={new Date(date)}
          data={this.state.data[i]}
          text={this.state.data[i]}
          positive={this.state.positive}
          negative={this.state.negative}
        />
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

