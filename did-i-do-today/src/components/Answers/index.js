import React, { Component } from 'react';
import Week from  '../Calendar/Week'

import { withFirebase } from  '../Firebase'

class Answers extends Component {
  constructor (props) {
    super(props);
    this.state = {
      questions: { questions: [] }
    };
    this.setQuestions = this.setQuestions.bind(this);
    this.setAnswers = this.setAnswers.bind(this);

    let date = new Date();
    date.setDate(date.getDate() - 28);

    this.state.date = date;

    this.props.firebase.doGetQuestions('gtang.gt', this.setQuestions);
    this.props.firebase.doGetAnswers('gtang.gt', this.state.date, this.setAnswers);

  }

  setQuestions(questions) {
    this.setState({
      questions
    });
  }

  setAnswers(answers) {
    console.log(answers);
    let answerIndex = 0;
    let date = new Date(this.state.date);
    let data = [];

    for (let i = 0; i < 7; i++)
    {
      let tmpDate = answers[answerIndex].timeCreated.toDate();
      console.log(tmpDate);

      if (tmpDate.getDate() === date.getDate()
        && tmpDate.getMonth() === date.getMonth()
        && tmpDate.getYear() === date.getYear())
      {
        answerIndex++;
        data.push('Yes');
      } else {
        data.push(undefined);
      }

      date.setDate(date.getDate() + 1);
    }

    this.setState({
      answers,
      data
    });
  }

  renderTitle() {
    if (typeof(this.state.questions.userId) === 'undefined') {
      return <h1>answers</h1>;
    }
    return <h1>{this.state.questions.userId + '\'s '}answers</h1>;
  }

  renderQuestions() {
    let ret = [];

    this.state.questions.questions.forEach((question, i) => {
      ret.push(
        <div key={question.value + (3 * i + 0)}>
          {question.value}
        </div>
      );
      ret.push(
        <br key={question.value + (3 * i + 1)} />
      );
      ret.push(
        <Week
          date={this.state.date}
          key={question.value + (3 * i + 2)}
          data={this.state.data}/>
      );
    });

    return ret;
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
        <br/>
        {this.renderQuestions()}
      </div>
    );
  }
}

export default withFirebase(Answers);
