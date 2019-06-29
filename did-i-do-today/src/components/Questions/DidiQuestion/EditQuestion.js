import React, { useState, Component } from 'react';
import { RadioButton } from '../../RadioComponent';
import { Field, ErrorMessage }  from 'formik';
import StringHash from 'string-hash';

const EditQuestion = ({
  name,
  error,
  ...props}) =>
{

  return (
    <div>
      <p>
        {'Did I '}
        <Field
          type='text'
          name={name}
        />
        {' Today?   '}

        <button
          type='button'
          onClick={()=>
            {
              props.delete(name);
            }
          }
        >Delete</button>
      </p>
    </div>
  );
};

export default EditQuestion;
