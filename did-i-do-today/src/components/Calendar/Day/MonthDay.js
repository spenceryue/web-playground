import React, { Component } from 'react'
import Gradient from '../Gradients';
import './style.css';

class MonthDay extends Component {

  constructor(props)
  {
    super(props);

    this.state = {};
    this.state.text = props.text;
    this.state.x = props.x || 0;
    this.state.y = props.y || 0;
    this.state.length = props.length || 100;
    this.state.padding = props.padding || 10;
    this.state.date = props.date; 
    this.state.data = (props.data === undefined) ? undefined : props.data;
    this.state.positive = (props.positive === undefined) ? true : props.positive;
    this.state.negative = (props.negative === undefined) ? false : props.negative;

    if (this.state.data === this.state.positive) {
      this.state.dataNum = 0.5;
    } else if (this.state.data === this.state.negative) {
      this.state.dataNum = -0.1;
    } else {
      this.state.dataNum = 0;
    }
  }

  showBox = () => {
    if (this.state.date !== undefined)
    {
      return (
        <rect
          className='boxMonth'
          x={this.state.padding}
          y={this.state.padding}
          width={this.state.length}
          height={this.state.length}
          fill={Gradient.green(this.state.dataNum)}
          stroke={'black'}
        />
      );
    }
  }
  

  render() {
    let dayOptions = {
      weekday: 'short',
    };

    let dateOptions = {
      month: 'short',
      day: 'numeric'
    };

    return <svg
      x={this.state.x}
      y={this.state.y}
      width={2 * this.state.padding + this.state.length}
      height={2 * this.state.padding + this.state.length}
    >
      {this.showBox()}
    </svg>;
  }
}

export default MonthDay;

