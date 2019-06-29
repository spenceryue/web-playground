import React, { Component } from 'react';

import Debug from '../Debug';

import { Formik, Form, Field, FieldArray, ErrorMessage }  from 'formik';

import * as yup from 'yup';

const Survey = () => (
  <div>
    <h1>Survey</h1>
    <Formik
      initialValues={{ questions: ['asdf', 'asdf', 'asdf' ]}}
    >
      {( formikProps ) => 
          (
            <FieldArray 
              name="questions"
              component={SurveyForm}
            />
          )
      }
    </Formik>
  </div>
)

const SurveyForm = ({ move, swap, push, insert, unshift, pop, form }) =>
{
  let array = [];
  form.values.questions.forEach((question) => { array.push((<div>{question}</div>))});

  return (
    <Form>
      {
        array
      }
    </Form>
  )
}

export default Survey;
