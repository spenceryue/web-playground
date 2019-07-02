import React from 'react';

import { Field }  from 'formik';
import { RadioGroup, RadioButton } from '../../../RadioComponent';

const DidIQuestion = ({ question, remove, index, ...props}) =>
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
