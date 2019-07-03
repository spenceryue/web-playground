import React from 'react';

import { RadioGroup, RadioButton } from '../../../RadioComponent';
import StringHash from 'string-hash';
import { Field, getIn }  from 'formik';

const DidIQuestion = ({ question, remove, index, ...props}) =>
{
  return (
    <div>
      <div>{'Did I '}
        <Field
          key={index}
          type='text'
          name={`questions.${index}`}
          value={question.value}
          onChange={(e) => {
            props.setFieldValue(`questions.${index}`,
              {
                type: question.type,
                name: question.name,
                value: e.target.value
              }, true);
          }
          }
        />
        {' Today? '}
        <button
          type='button'
          onClick={
            (e) =>
            {
              remove(index);
            }
          }
        >Delete</button>
        <ErrorMessage name={`questions[${index}]`}/>
      </div>
    </div>
  );
};

const ErrorMessage = ({ name }) => (
    <Field
      name={name}
      render={({ form }) => {
              const error = getIn(form.errors, name);
              const touch = getIn(form.touched, name);
              return touch && error ? <p>{error.value}</p> : null;
            }}
    />
);

export default DidIQuestion;
