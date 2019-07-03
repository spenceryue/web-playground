import React, { useState } from 'react';
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

let valid = { questions : yup.array().required('Must have questions').min(1, 'ask at least 1 question')};
const validation = yup.object().shape(valid);


const EditSurvey = () => 
(
  <div>
    <h1>Edit Survey</h1>
    <Formik
      validationSchema={ validation }
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
              name='questions'
              render={ (props) => (
                <EditSurveyForm 
                  {...formikProps}
                  {...props}
                />
              )}
            />
          )
      }
    </Formik>
  </div>
)

const EditSurveyForm = ({ name, move, swap, push, insert, unshift, pop, form, ...props}) =>
{
  let array = [];
  form.values.questions.forEach(
    (question, index) => {
      array.push((<EditQuestion
        key={question.name}
        question={question}
        remove={props.remove}
        index={index}
        setFieldValue={props.setFieldValue}
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
      <button type='button'
        onClick={(e) =>
          {
            push({value: '', type: 'didi', name: Math.random() * 1000000});
          }
        }
      >Add Question</button>
      <button type='submit'>Submit</button>
      <Debug/>
    </Form>
  )
}
export default EditSurvey;
