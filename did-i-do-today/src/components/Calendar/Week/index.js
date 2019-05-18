import React, { Component } from 'react'
import Gradient from '../Gradients';
import './style.css'

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

    if (this.props.trailing === 'undefined') {
      this.state.trailing = true;
    } else {
      this.state.trailing = this.props.trailing;
    }
    this.state.date = this.props.date || new Date();
    this.state.data = this.props.data || [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];

    this.state.days = [];

    if (this.state.trailing) {
      this.state.date.setDate(this.state.date.getDate() - 6);

      for (let i = 0; i < 7; i++)
      {
        this.state.days.push({
          day: this.state.date.getDay(),
          value: this.state.data[i]
        });
        this.state.date.setDate(this.state.date.getDate() + 1);
      }
    } else {
      for (let i = 0; i < 7; i++)
      {
        this.state.days.push({
          day: i,
          value: this.state.data[i]
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
          className='Day'
          key={'1'}
          x={(this.state.length + this.state.padding) * i + this.state.offX}
          y={this.state.offY}
          width={this.state.length}
          height={this.state.length}
          fill={Gradient.green(this.state.days[i].value)}
          stroke-width={3}
          stroke={'black'}
        >
        </rect>
      );
    }
    return ret;
  }

  render() {
    return <svg
      width={5 + 7 * (this.state.padding + this.state.length)}
      height={this.state.length * 2}
    >
      {this.createDays()}
      {this.createWeekText()}
    </svg>;
  }
}

export default Week;

