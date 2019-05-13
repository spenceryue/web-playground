import React, { Component } from 'react'
import Month from '../Month'

class Year extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.year = props.year;

    this.state.offset_x = props.offset_x || 100;
    this.state.offset_y = props.offset_y || 100;

    this.state.square_length = props.square_length || 15;
    this.state.square_padding = props.square_padding || 2;
    this.state.month_padding = props.month_padding || 1;

    this.state.data = props.data;
    this.state.metric = props.metric;
    this.state.max = props.max;
    this.data = props.data;
  }

  createMonth = () => 
  {
    let months = [];

    for (let i = 0; i < 12; i++)
    {
      let curr_month = [];
      
      if (typeof(this.data) !== 'undefined')
      {
        if (i < 11)
        {
          let ptr = -1;
          while (this.data[++ptr].date.getMonth() === i);
          curr_month = this.data.splice(0, ptr);
        }
        else
        {
          curr_month = this.data;
        }
      }

      let createWeekdays = false;
      if (i === 0)
      {
        createWeekdays = true;
      }
      months.push(<Month
          key={i}
          offset_x={this.state.offset_x + i * (this.state.square_length + this.state.square_padding) * 6 + this.state.month_padding}
          offset_y={this.state.offset_y}
          square_length={this.state.square_length}
          square_padding={this.state.square_padding}
          createWeekdays={createWeekdays}
          month={i}
          data={curr_month}
          max={this.state.max}
          year={this.state.year}
          metric={this.state.metric} >
          </Month>)
    }

    return months;
  }

  componentDidUpdate(prevProps)
  {
    if (prevProps.metric !== this.props.metric)
    {
      this.setState({
        metric: this.props.metric
      });
    }
  }

  render() {
    return <svg
        width={2400}
        height={300}
      >
        <text
          x={this.state.offset_x}
          y={this.state.offset_y - 35}
          >{this.state.year}
        </text>
      {this.createMonth()}
      </svg>;
  }
}

export default Year;
