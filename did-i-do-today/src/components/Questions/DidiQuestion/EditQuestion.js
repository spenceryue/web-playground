import React, { useState, Component } from 'react';
import { RadioButton } from '../../RadioComponent';
import { Field, ErrorMessage }  from 'formik';
import StringHash from 'string-hash';

const EditQuestion = ({
  name,
  label,
  error,
  touched,
  ...props}) =>
{

  const [ value, setValue ] = useState(label);
  return (
    <div>
      <p>
        {'Did I '}
        <Field
          name={name}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        {' Today?'}
      </p>
    </div>
  );

  /*
  return (
    <div>
      <p>
        {'Did I '} 
        <Field
          name={name}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        {' Today?'}
      </p>


      <ErrorMessage name={props.text} component='div'/>
    </div>
  );*/
};

export default EditQuestion;
