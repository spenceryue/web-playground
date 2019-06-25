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
      questions: { questions: [] },
      // lastToday
    };

    
    //if (lastToday)
    //{
    // this.props.history.push(ROUTES.ANSWERS);
    //  return;
    //}

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

  renderQuestions(values, errors, touched) {
    let ret = [];

    this.state.questions.questions.forEach((question, i) => {

      if (question.type === 'binary')
      {
        ret.push(
          <DidiQuestion
            key={question.value}
            name={StringHash(question.value)}
            label={'Did I ' + question.value + ' Today?'}
            value={values[StringHash(question.value)]}
            error={errors[StringHash(question.value)]}
            touched={touched[StringHash(question.value)]}
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
              key={question.value + i}
              text={question.value} />
        );
      }
      ret.push( <br key={'br' + question.value}/> );
    });

    return ret;
  }

  formikSubmit (values, actions) {
    console.log(values);
    return;

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
    let valid = {};
    let empty = {};

    this.state.questions.questions.forEach((question) => {
      valid[StringHash(question.value)] = yup.string().required('An answer is required');
      empty[StringHash(question.value)] = '';
    });

    const validation = yup.object().shape(valid);

    console.log(empty);
    return (
      <div>
        {this.renderTitle()}
        <Formik 
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
                <div/>

                <Debug/>
              </form>
            )
          }
        </Formik> 

        <button>
          Edit Survey
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
