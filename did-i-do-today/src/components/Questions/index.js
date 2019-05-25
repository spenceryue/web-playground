import React, { Component } from 'react';
import Week from  '../Calendar/Week'
import BinaryQuestion from  '../BinaryQuestion'
import IntegerQuestion from  '../IntegerQuestion'

import { compose } from 'recompose';
import { Formik, Form, Field, ErrorMessage }  from 'formik';
import { withRouter } from 'react-router-dom';
import { withFirebase } from  '../Firebase'
import * as ROUTES from '../../constants/routes';

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
          <BinaryQuestion
            key={question.value + i}
            text={question.value}/>
        );
      } else if (question.type === 'integer') {
        ret.push(
          <IntegerQuestion
            text={question.value}
          />
        );
      }
      ret.push( <br/> );
    });

    return ret;
  }

  render() {
    console.log(this.state.questions);
    return (
      <div>
        <Formik onSubmit={(values, actions) => {
            console.log(values);
            console.log(actions);
            this.props.history.push(ROUTES.ANSWERS);
          }
        }
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
    </div>
    );
  }
}

const QuestionForm = compose(
  withRouter,
  withFirebase
)(Questions);

export default QuestionForm;
