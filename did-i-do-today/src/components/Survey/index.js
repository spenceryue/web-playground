import React, { useState } from 'react';
import Debug from '../Debug';
import { Formik, Form, Field, FieldArray, ErrorMessage }  from 'formik';
import * as yup from 'yup';
import StringHash from 'string-hash';
import Question from './Question';
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


const Survey = () => {

  const [edit, setEdit] = useState(false);

  return (
    <div>
      <h1>{ edit ? 'Edit ' : ''}Survey</h1>
      <Formik
        validationSchema={ edit ? null : validation }
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
                render={ (props) => {
                  console.log(formikProps);

                  return edit ?
                    <EditSurveyForm 
                      {...formikProps}
                      {...props}
                    /> :
                    <SurveyForm 
                      {...formikProps}
                      {...props}
                    />
                }}
              />
            )
        }
      </Formik>

      <button
        onClick={() => 
          {
            setEdit(!edit);
          }
        }
      >{ edit ? 'Cancel' : 'Edit Survey' }</button>
    </div>
  )
}

const SurveyForm = ({ name, move, swap, push, insert, unshift, pop, form, ...props}) =>
{
  let array = [];
  form.values.questions.forEach(
    (question, index) => {
      array.push((<Question
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
      <button type='button' onClick={() => {
        console.log('formik');
        console.log(props.setFieldValue);
        //props.setFieldValue('questions', 'hello world', false);
      }

        }>Formik</button>

      <button type='submit'>Submit</button>
      <Debug/>
    </Form>
  )
}

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
            push({value: '', type: 'didi', name: Math.random() * 10000});
          }
        }
      >Add Question</button>
      <button type='submit'>Submit</button>
      <Debug/>
    </Form>
  )
}
export default Survey;
