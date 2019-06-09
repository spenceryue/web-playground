import React, { Component } from 'react';
import Week from  '../Calendar/Week';

import { withFirebase } from  '../Firebase';
import { withAuthorization } from  '../Session';
import StringHash from 'string-hash';

import { compose } from 'recompose';
import SignOutButton from '../Logout';

const questionHashes =
  [
    '3167593219',
    '1680920143',
    '3800379784',
    '2087592373',
    '1350393365'
  ]

class Answers extends Component {
  constructor (props) {
    super(props);
    this.state = {
      questions: { questions: [] }
    };
    this.setQuestions = this.setQuestions.bind(this);
    this.setAnswers = this.setAnswers.bind(this);

    let date = new Date();
    date.setDate(date.getDate() - 6);

    this.state.date = date;

    this.props.firebase.doGetQuestions(props.authUser.email, this.setQuestions);
    this.props.firebase.doGetAnswers(props.authUser.email, this.state.date, this.setAnswers);

  }

  setQuestions(questions) {
    this.setState({
      questions
    });
  }

  setAnswers(answers) {
    console.log(answers);
    let date = new Date(this.state.date);
    let data = {};
    questionHashes.forEach((hash) =>
      {
        data[hash] = []
      });

    let answerIndex = 0;
    for (let i = 0; i < 7; i++)
    {
      if (answers === undefined || answers[answerIndex] === undefined)
      {
        questionHashes.forEach((hash) =>
          {
            data[hash].push(undefined);
          });
        continue;
      }

      let tmpDate = answers[answerIndex].timeCreated.toDate();

      if (tmpDate.getDate() === date.getDate()
        && tmpDate.getMonth() === date.getMonth()
        && tmpDate.getYear() === date.getYear())
      {
        //data.push(answers[answerIndex].answers['6f1a1da7-dadd-4492-9ada-17198271588e']);
        questionHashes.forEach((hash) =>
          {
            data[hash].push(answers[answerIndex].answers[hash])
          });

        answerIndex++;
      } else {
        questionHashes.forEach((hash) =>
          {
            data[hash].push(undefined);
          });
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
      if (question.type === 'binary')
      {
        ret.push(
          <div key={question.value + (3 * i + 0)}>
            {'Did I ' + question.value + ' today?'}
          </div>
        );
        ret.push(
          <br key={question.value + (3 * i + 1)} />
        );
        ret.push(
          <Week
            date={this.state.date}
            key={question.value + (3 * i + 2)}
            data={this.state.data[StringHash(question.value)]}/>
        );
      }
    });

    return ret;
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
        <br/>
        {this.renderQuestions()}
        <SignOutButton/>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

const AnswersForm = compose(
  withAuthorization(condition),
  withFirebase
)(Answers);

export default AnswersForm;
