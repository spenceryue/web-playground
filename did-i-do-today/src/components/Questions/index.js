import React, { Component } from 'react';
import Week from  '../Calendar/Week'
import BinaryQuestion from  '../BinaryQuestion'
import IntegerQuestion from  '../IntegerQuestion'
import DidiQuestion from  '../DidiQuestion'

import { compose } from 'recompose';
import { Formik, Form, Field, ErrorMessage }  from 'formik';
import { withAuthorization } from  '../Session';
import { withRouter } from 'react-router-dom';
import { withFirebase } from  '../Firebase'
import * as ROUTES from '../../constants/routes';
import StringHash from 'string-hash';

import * as yup from 'yup';

class Questions extends Component {
  constructor (props) {
    super(props);

    let lastDate = new Date(JSON.parse(localStorage.getItem('lastDateSubmitted')));
    let todayDate = new Date();

    //let lastToday = lastDate.getYear() === todayDate.getYear() &&
    //lastDate.getDate() === todayDate.getDate() &&
    //lastDate.getMonth() === todayDate.getMonth();

    this.state = {
      questions: { questions: [] },
      //lastToday
    };

    /*
    if (lastToday)
    {
      this.props.history.push(ROUTES.ANSWERS);
      return;
    }*/

    this.setQuestions = this.setQuestions.bind(this);
    this.formikSubmit = this.formikSubmit.bind(this);
    props.firebase.doGetQuestions(props.authUser.email, this.setQuestions);
  }

  setQuestions(questions) {
    this.setState({
      questions
    });

    localStorage.setItem('questions', JSON.stringify(questions));
  }

  renderTitle() {
    if (typeof(this.state.questions.userId) === 'undefined') {
      return <h1>questions</h1>;
    }
    return <h1>{this.state.questions.userId + '\'s '}questions</h1>;
  }

  renderQuestions() {
    let ret = [];

    this.state.questions.questions.forEach((question, i) => {

      if (question.type === 'binary')
      {
        ret.push(
            <DidiQuestion
              name={question.value}
              key={question.value + i}
              text={question.value} />
        );
      } else if (question.type === 'integer') {
        ret.push(
          <IntegerQuestion
            text={question.value} />
        );
      } else if (question.type === 'didi') {
        ret.push(
            <DidiQuestion
              key={question.value + i}
              text={question.value} />
        );
      }
      ret.push( <br key={'br' + question.value}/> );
    });

    return ret;
  }

  formikSubmit(values, actions) {
    console.log(values);
    this.props.history.push(ROUTES.ANSWERS);
    let obj = values;
    for (let keys in obj)
    { 
      if (obj[keys] === 'yes')
      {
        obj[keys] = true;
      }
      else if (obj[keys] === 'no')
      {
        obj[keys] = false;
      }
    }
    console.log(obj);

    this.props.firebase.doSetAnswers(this.props.authUser.email, obj);
    localStorage.setItem('lastDateSubmitted', JSON.stringify(new Date()));
  }

  renderForm() {
    let test = {};

    this.state.questions.questions.forEach((question, i) => {
      test[StringHash(question.value)] = yup.string().oneOf(['Yes', 'No']).required();
    });
      
    console.log(test);

    const validation = yup.object().shape(test);

    //if (!this.state.lastToday) {
      return (
        <Formik 
          onSubmit={this.formikSubmit}
          validationSchema={validation}
        >
          <Form>
            {this.renderTitle()}
            <br/>
            {this.renderQuestions()}
            <button
              type='submit'>
              Submit
            </button>
          </Form>
        </Formik> 
      );
    //}
  }

  render() {
    return (
      <div>{this.renderForm()}</div>
    );
  }
}

const condition = authUser => { 
  return !!authUser;
}

const QuestionsPage = compose(
  withFirebase,
  withRouter
)(Questions);

export { QuestionsPage };

export default withAuthorization(condition)(Questions);
