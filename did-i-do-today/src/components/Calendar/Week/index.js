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
    this.state.data = this.props.data || ['Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes'];

    this.state.days = [];

    if (this.state.trailing) {
      this.state.date.setDate(this.state.date.getDate() - 6);

      for (let i = 0; i < 7; i++)
      {
        this.state.days.push({
          day: this.state.date.getDay(),
          value: (this.state.data[i] === 'Yes') ? 0.5 : 0
        });
        this.state.date.setDate(this.state.date.getDate() + 1);
      }
    } else {
      for (let i = 0; i < 7; i++)
      {
        this.state.days.push({
          day: i,
          value: (this.state.data[i] === 'Yes') ? 0.5 : 0
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
        x={this.state.offX * 2 + (this.state.length + this.state.padding) * i}
        y={this.state.offY}
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
          key={i}
          x={(this.state.length + this.state.padding) * i + this.state.offX}
          y={this.state.offY}
          width={this.state.length}
          height={this.state.length}
          fill={Gradient.green(this.state.days[i].value)}
          stroke={'black'}
        />
      );

      ret.push(
        <text className='innerText'
          key={'text' + i}
          x={this.state.offX * 2 + (this.state.length + this.state.padding) * i}
          y={this.state.offY + (this.state.length / 2)}
          fontSize={this.state.length * 0.2 + 'px'} >
          {this.state.data[i]}
        </text>
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

