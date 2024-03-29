import React, { Component } from 'react';
import Gradient from '../Gradients';
import { MonthDay } from '../Day';

const days_in_week = 7
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days_of_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const random = [undefined, false, true]

class Month extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.state.offset_x = props.offset_x;
    this.state.offset_y = props.offset_y;

    this.state.month_name = months[props.month];
    this.state.month = props.month;
    this.state.year = props.year;
    this.state.data = props.data;
    this.state.max = props.max;

    this.state.square_length = props.square_length;
    this.state.square_padding = props.square_padding;
    this.state.metric = props.metric;

    this.state.random = [];
    for (let i = 0; i < 32; i++)
    {
      this.state.random.push(Math.random());
    }

    this.state.dataArray = this.getDataArray();

    this.state.createWeekdays = props.createWeekdays;
  }

  getDataArray = () => {
    let date = new Date();
    date.setDate(1);
    date.setYear(this.state.year);
    date.setMonth(this.state.month);

    let data_array = [];
    let ptr = 0;
    for (let i = 0; i < 7 * 6; i++)
    {
      if (date.getMonth() !== this.props.month)
      {
        data_array.push(undefined);
        continue;
      }

      if (i % 7 === date.getDay())
      {
        data_array.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      else
      {
        data_array.push(undefined);
      }
    }

    return data_array;
  }


  createMonth = () => {
    let month = [];

    for (let i = 0; i < 7 * 6; i++) {
      month.push(
        <MonthDay
          data={random[Math.floor(Math.random() * 3)]}
          date={this.state.dataArray[i]}
          length={this.state.square_length}
          padding={this.state.square_padding}
          x={this.state.offset_x + (this.state.square_padding + this.state.square_length) * Math.floor(i / days_in_week)}
          y={this.state.offset_y + (this.state.square_padding + this.state.square_length) * (i % days_in_week)}
        />
      );
    }

    return month;
  }

  createWeekdays = () => {
    if (this.state.createWeekdays)
    {
      let weekdays = [];

      for (let i = 0; i < 7; i++)
      {
        weekdays.push(<text
            key={days_of_week[i]}
            x={this.state.offset_x - 30}
            y={this.state.offset_y + 13 + (this.state.square_length + this.state.square_padding) * i}
            fontSize={'10px'} >
            {days_of_week[i]}
            </text>)
      }
      return weekdays;
    }
  }

  render() {
    return <svg>
      <text
        x={this.state.offset_x}
        y={this.state.offset_y - 10}
      >{this.state.month_name}
      </text>
       {this.createWeekdays()}
       {this.createMonth()}
      </svg>
  }
}

export default Month;
