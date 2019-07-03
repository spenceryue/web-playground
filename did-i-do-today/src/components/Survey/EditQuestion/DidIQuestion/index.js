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
          onChange={(e) => {
            props.setFieldValue(`questions.${index}`, e.target.value, false);
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
      </p>
    </div>
  );
};

export default DidIQuestion;
