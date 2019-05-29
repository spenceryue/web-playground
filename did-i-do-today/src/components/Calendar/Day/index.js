import React, { Component } from 'react'
import Gradient from '../Gradients';
import './style.css';

class Day extends Component {

  constructor(props)
  {
    super(props);

    let dateOptions = {
      month: 'short',
      day: 'numeric'
    };

    this.state = {};
    this.state.length = props.length || 100;
    this.state.padding = props.padding || 10;
    this.state.date = props.date || new Date();
    this.state.text = props.text || this.state.date.toLocaleDateString('en-US', dateOptions);
  }

  render() {
    let dayOptions = {
      weekday: 'short',
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
        fill={Gradient.green(0.5)}
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
        textSize='10px'
        y='15%'
        x='50%'>
        {this.state.date.toLocaleDateString('en-US', dayOptions)}
      </text>    
    </svg>;
  }
}

export default Day;

