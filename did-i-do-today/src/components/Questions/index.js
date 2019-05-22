import React, { Component } from 'react';

import { withFirebase } from  '../Firebase'

class Questions extends Component {
  constructor (props) {
    super(props);
    this.state = {
      questions: { questions: [] }
    };
    this.setQuestions = this.setQuestions.bind(this);
    this.props.firebase.doGetQuestions('gtang.gt', this.setQuestions);
  }

  setQuestions(questions) {
    this.setState({
      questions
    });
  }

  renderQuestions() {
    let ret = [];

    this.state.questions.questions.forEach((question) => {
      ret.push(
        <div>
          {question.value}
        </div>
      );
      ret.push(
        <br/>
      );
    });

    return ret;
  }

  render() {
    console.log(this.state.questions);
    return (
      <div>
        Questions
        <br/>
        {this.renderQuestions()}
      </div>
    );
  }
}

export default withFirebase(Questions);
