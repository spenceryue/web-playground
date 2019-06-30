import React, { Component } from 'react';
import Debug from '../Debug';
import { Formik, Form, Field, FieldArray, ErrorMessage }  from 'formik';
import * as yup from 'yup';
import StringHash from 'string-hash';
import EditQuestion from './EditQuestion';

const dummy = [
  {
    name: StringHash('do at least 2 leetcode'),
    value: 'do at least 2 leetcode',
    type: 'didi'
  },
  {
    name: StringHash('live'),
    value: 'live',
    type: 'didi'
  }
]

let valid = {};
dummy.forEach((question) => {
  valid[question.name] = yup.string().required('An answer is required');
});
const validation = yup.object().shape(valid);

const EditSurvey = () => (
  <div>
    <h1>Edit Survey</h1>
    <Formik
      validationSchema={validation}
      initialValues={{ questions: dummy }}
      onSubmit={values =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500)
      }
    >
      {( formikProps ) => 
          (
            <FieldArray 
              name="questions"
              component={EditSurveyForm}
            />
          )
      }
    </Formik>
  </div>
)

const EditSurveyForm = ({ move, swap, push, insert, unshift, pop, form }) =>
{
  let array = [];
  form.values.questions.forEach(
    (question) => {

      array.push((<EditQuestion
        key={question.name}
        question={question}
      />))
      array.push(<br
        key={question.name + 'br'}
      />);

    }
  );

  return (
    <Form>
      {
        array
      }
      <button>Submit</button>
      <Debug/>
    </Form>
  )
}

export default EditSurvey;
