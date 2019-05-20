import React, { Component } from 'react';

class Questions extends Component {
  constructor (props) {
    super(props);
  }

  changeHandler = event => {
    this.setState({
      email: event.target.value
    });
  }

  render() {
    return (
      <div>
        Questions
      </div>
    );
  }
}

export default Questions;
