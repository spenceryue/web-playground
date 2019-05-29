import React, { Component } from 'react'
import Gradient from '../Gradients';
import './style.css';

class Day extends Component {

  constructor(props)
  {
    super(props);

    this.state = {};
    this.state.text = props.text;
    this.state.length = props.length || 100;
    this.state.padding = props.padding || 10;
    this.state.date = props.date || new Date();
    this.state.data = (props.data === undefined) ? undefined : props.data;
    this.state.positive = (props.positive === undefined) ? true : props.positive;
    this.state.negative = (props.negative === undefined) ? false : props.negative;

    console.log(this.state.data);
    console.log(this.state.negative);
    if (this.state.data === this.state.positive) {
      this.state.dataNum = 0.5;
    } else if (this.state.data === this.state.negative) {
      this.state.dataNum = -0.1;
    } else {
      this.state.dataNum = 0;
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
      width={2 * this.state.padding + this.state.length}
      height={2 * this.state.length}
    >
      <rect
        className='box'
        x={this.state.padding}
        y='25%'
        width={this.state.length}
        height={this.state.length}
        fill={Gradient.green(this.state.dataNum)}
        stroke={'black'}
      />
      <text
        className='detail'
        x='50%'
        y='50%'
        dominantBaseline='middle'
        textAnchor='middle'>
        {this.state.text}
      </text>    
      <text
        textAnchor='middle'
        textsize='10px'
        y='15%'
        x='50%'>
        {this.state.date.toLocaleDateString('en-US', dateOptions) +
            ' ' +
            this.state.date.toLocaleDateString('en-US', dayOptions)}
      </text>    
    </svg>;
  }
}

export default Day;

