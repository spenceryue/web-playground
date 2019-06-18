import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DidIQuestion from './DidIQuestion';
import IntegerQuestion from './IntegerQuestion';
import * as yup from 'yup';

const questions = [
  'poop',
  'Did I do 2 leetcode today?',
  'Did I talk to 10 people today?',
  'Did I play basketball today?',
  'Am I happy today?'
]

class Forms extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.validMap = {};
    this.emptyMap = {};
    questions.forEach((question) =>
      {
        this.validMap[question] = yup.string().required('required field');
        this.emptyMap[question] = '';
      });

    this.validation = yup.object().shape(this.validMap);
  }

  createQuestions () {
    let ret = [];

    for (let i = 0; i < questions.length; i++)
    {
      ret.push(
        <IntegerQuestion
          text={questions[i]}
        />
      );
    }

    return ret;
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        <Formik
          initialValues={this.emptyMap}
          validationSchema={this.validation}
          onSubmit={(values, { setSubmitting }) => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              }
            }
          >
              {({ isSubmitting }) => (
              <Form>
                {
                  this.createQuestions()
                }

                <div/>
                <button type='submit' disabled={isSubmitting}>
                  Submit
                </button>

                {error && <p id='loginerror'>{error.message}</p>}
              </Form>
            )}

          </Formik>
      </div>
    )
  }
};

export default Forms;
