import React, { useState } from 'react';
import Debug from '../Debug';
import { Formik, Form, Field, FieldArray, ErrorMessage }  from 'formik';
import * as yup from 'yup';
import StringHash from 'string-hash';
import EditQuestion from './EditQuestion';

const empty = []

let valid = { questions : yup.array()
  .of(
    yup.object().shape({
      name: yup.string(),
      value: yup.string().required('required'),
      type: yup.string()
    })
  )
  .required('Must have questions')};

const validation = yup.object().shape(valid);


const EditSurvey = ({ onSubmit }) => 
(
  <div>
    <h1>Edit Survey</h1>
    <Formik
      validationSchema={ validation }
      initialValues={{ questions: empty }}
      onSubmit={values => onSubmit(values)}
    >
      {( formikProps ) => 
          (
            <Form>
            <FieldArray 
              name='questions'
              render={ (props) => (
                <EditSurveyForm 
                  {...formikProps}
                  {...props}
                />
              )}
            />
          </Form>
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
    <div>
      {array}
      <br/>
      <QuestionsArrayError errors={form.errors} />
      <button type='button'
        onClick={(e) =>
          {
            push({value: '', type: 'didi', name: Math.random() * 1000000});
          }
        }
      >Add Question</button>
      <button type='submit'>Submit</button>
      <Debug/>
    </div>
  )
}

// within a `FieldArray`'s render
const QuestionsArrayError = ({ errors }) =>
   typeof errors.questions === 'string' ? <div>{errors.questions}</div> : null;

export default EditSurvey;