import React from 'react';

import { Field }  from 'formik';
import { RadioGroup, RadioButton } from '../../../RadioComponent';

const DidIQuestion = ({ question, value, error, touched, remove }) =>
{
  return (
    <div>
      <p>{'Did I '}
        <Field
          type='text'
          name={question.name}
          value={question.value}
        />
        {' Today? '}
        <button
          type='button'
        >Delete</button>
      </p>
    </div>
  );
};

export default DidIQuestion;
