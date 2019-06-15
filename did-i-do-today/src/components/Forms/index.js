import React, { Component } from 'react';

const questions = [
  'Did I do 2 leetcode today?',
  'Did I talk to 10 people today?',
  'Did I play basketball today?',
  'Am I happy today?'
]

class Forms extends Component {

  createQuestions () {
    let ret = [];

    for (let i = 0; i < questions.length; i++)
    {
      ret.push(<div>
        {questions[i]}
      </div>
      )
    }

    return ret;
  }

  render() {
    return (
      <div>
        {this.createQuestions()}
      </div>
    )
  }
};

export default Forms;
