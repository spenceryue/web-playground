import React, { Component } from 'react';
import Week from  '../Calendar/Week'
import BinaryQuestion from  './BinaryQuestion'
import IntegerQuestion from  './IntegerQuestion'
import DidiQuestion from  './DidiQuestion'
import { RadioGroup, RadioButton } from '../RadioComponent';

import Debug from '../Debug';

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
      questions: [],
      editing: false
      // lastToday
    };

    
    //if (lastToday)
    //{
    // this.props.history.push(ROUTES.ANSWERS);
    //  return;
    //}

    this.setQuestions = this.setQuestions.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.formikSubmit = this.formikSubmit.bind(this);
    props.firebase.doGetQuestions(props.authUser.email, this.setQuestions);
  }

  setQuestions(questions) {
    let _questions = [...questions.questions];
    _questions.forEach((question) =>
      {
        question.name = StringHash(question.value);
      })

    this.setState({
      questions: _questions,
      userId: questions.userId
    });

    localStorage.setItem('questions', JSON.stringify(questions));
  }

  deleteQuestion(questionId) {
    let array = [...this.state.questions];
    let index = -1;

    for (let i = 0; i < array.length; i++)
    {
      if (array[i].name == questionId)
      {
        index = i;
        break;
      }
    }

    if (index !== -1)
    {
      array.splice(index, 1);
      this.setState({
        questions: array
      });
    }
  }

  addQuestion()
  {
    let array = [
      ...this.state.questions,
      {
        type: 'binary',
        value:'',
        name: Math.round(Math.random() * 10000000000)
      }
    ];

    this.setState({
      questions: array
    });
  }

  renderTitle() {
    if (typeof(this.state.userId) === 'undefined') {
      return <h1>questions</h1>;
    }
    return <h1>{this.state.userId + '\'s '}questions</h1>;
  }

  renderQuestions(values, errors, touched) {
    let ret = [];

    this.state.questions.forEach((question, i) => {

      if (question.type === 'binary')
      {
        ret.push(
          <DidiQuestion
            delete={this.deleteQuestion}
            editing={this.state.editing}
            key={question.name}
            name={question.name}
            label={question.value}
            value={values[question.name]}
            error={errors[question.name]}
            touched={touched[question.name]}
          />
				);
      } else if (question.type === 'integer') {
        ret.push(
          <IntegerQuestion
            text={question.value} />
        );
      } else if (question.type === 'didi') {
        ret.push(
            <DidiQuestion
              key={question.name + i}
              text={question.value} />
        );
      }
      ret.push( <br key={'br' + question.name}/> );
    });

    return ret;
  }

  renderFormik()
  {

    let valid = {};
    let empty = {};
    console.log(this.state.questions);

    if (!this.state.editing)
    {
      this.state.questions.forEach((question) => {
        valid[question.name] = yup.string().required('An answer is required');
        empty[question.name] = '';
      });
    }
    else
    {
      this.state.questions.forEach((question) => {
        valid[question.name] = yup.string().required('An answer is required');
        empty[question.name] = question.value;
      });
    }

    const validation = yup.object().shape(valid);

    if (this.state.editing)
    {
      return (<Formik
          enableReinitialize
          onSubmit={this.formikSubmit}
          initialValues={empty}
          validationSchema={validation}
        >
          {({ values, handleSubmit, errors, touched, isSubmitting }) =>
              (
                <form onSubmit={handleSubmit}>
                  <br/>
                  {this.renderQuestions(values, errors, touched)}
                  <button
                    type='submit'>
                    Submit
                  </button>
                  <button onClick={
                    ()=> {
                      this.addQuestion();
                    }
                  }
                  type='button'
                  >
                    Add Question
                  </button>
                  <Debug/>
                  <div/>
                </form>
              )
          }
        </Formik>);
    }
    else
    {
      return (<Formik
          enableReinitialize
          onSubmit={this.formikSubmit}
          initialValues={empty}
          validationSchema={validation}
        >
          {({ values, handleSubmit, errors, touched, isSubmitting }) =>
              (
                <form onSubmit={handleSubmit}>
                  <br/>
                  {this.renderQuestions(values, errors, touched)}
                  <button
                    type='submit'>
                    Submit
                  </button>
                  <Debug/>
                  <div/>
                </form>
              )
          }
        </Formik>);
    }

  }

  formikSubmit (values, actions) {
    if (this.state.editing)
    {
      console.log(values);
      return;
    }
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

    this.props.firebase.doSetAnswers(this.props.authUser.email, obj);
    localStorage.setItem('lastDateSubmitted', JSON.stringify(new Date()));
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
        {this.renderFormik()}

        <button onClick={(event) => {
          this.setState({ editing: !this.state.editing });
        }
        }>
        { (this.state.editing) ? 'Cancel' : 'Edit Survey' }
        </button>
      </div>
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
