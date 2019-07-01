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
                name={ edit ? 'edit' : 'questions' }
                component={ edit ? SurveyForm : SurveyForm }
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
      if (name === 'edit') {
        array.push((<EditQuestion
          key={question.name}
          question={question}
        />))
        array.push((<button
          key={'delete' + question.name}
          type='button'
          onClick={(e) =>
            {
              console.log(props.remove);
            }
          }
        >
          Delete
        </button>
        ))
      } else if (name === 'questions') {
        array.push((<Question
          key={question.name}
          question={question}
        />))
      }

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
    </Form>
  )
}

export default Survey;
