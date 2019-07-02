import React from 'react';

import { Field }  from 'formik';
import { RadioGroup, RadioButton } from '../../../RadioComponent';

const DidIQuestion = ({ question, value, error, touched, remove, index }) =>
{
  return (
    <div>
      <p>{'Did I '}
        <Field
          key={index}
          type='text'
          name={`questions.${index}`}
          value={question.value}
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
      </p>
    </div>
  );
};

export default DidIQuestion;
