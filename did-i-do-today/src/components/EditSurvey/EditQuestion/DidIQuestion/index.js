import React from 'react';

import { Field }  from 'formik';
import { RadioGroup, RadioButton } from '../../../RadioComponent';
import StringHash from 'string-hash';

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
      </p>
    </div>
  );
};

export default DidIQuestion;
