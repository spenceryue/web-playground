import React, { Component } from 'react'
import Gradient from '../Gradients';

const days_of_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

class Week extends Component {

  constructor(props)
  {
    super(props);
    this.state = {};

    this.state.length = 100;
    this.state.padding = 25;
    this.state.offX = 25;
    this.state.offY = 20;

    this.state.trailing = false;

    const date = new Date();

    this.state.days = [];

    if (this.state.trailing)
    {
      date.setDate(date.getDate() - 6);

      for (let i = 0; i < 7; i++)
      {
        this.state.days.push({
          day: date.getDay(),
          value: 0.5
        });
        date.setDate(date.getDate() + 1);
      }
    }
    else
    {
      for (let i = 0; i < 7; i++)
      {
        this.state.days.push({
          day: i,
          value: i <= date.getDay() ? 0.5 : 0
        });
      }
    }
  }

  createWeekText = () => {
    let weekdays = [];

    for (let i = 0; i < 7; i++)
    {
      weekdays.push(<text
        key={days_of_week[this.state.days[i].day]}
        y={this.state.offY}
        x={this.state.offX * 2 + (this.state.length + this.state.padding) * i}
        fontSize={this.state.length * 0.20 + 'px'} >
        {days_of_week[this.state.days[i].day]}
      </text>)
    }

    return weekdays;
  }

  createDays = () =>{
    let ret = [];

    for (let i = 0; i < 7; i++)
    {
      ret.push(
        <rect
          key={'1'}
          x={(this.state.length + this.state.padding) * i + this.state.offX}
          y={this.state.offY}
          width={this.state.length}
          height={this.state.length}
          fill={Gradient.green(this.state.days[i].value)}
        >
        </rect>
      );
    }
    return ret;
  }

  render() {
    return <svg
      width={7 * (this.state.padding + this.state.length)}
      height={this.state.length * 2}
    >
      {this.createDays()}
      {this.createWeekText()}
    </svg>;
  }
}

export default Week;

