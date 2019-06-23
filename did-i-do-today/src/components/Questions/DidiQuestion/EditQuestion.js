import React, { useState, Component } from 'react';
import { RadioButton } from '../../RadioComponent';
import { Field, ErrorMessage }  from 'formik';
import StringHash from 'string-hash';

const EditQuestion = ({ handleChange, ...props }) =>
{

  const [ value, setValue ] = useState(props.text);
  return (
    <div>
      <p>
        {'Did I '} 
        <Field
          name={StringHash(props.text)}
          value={value}
          onChange={(e) => {
            handleChange(e);
            setValue(e.target.value);
          }}
        />
        {' Today?'}
      </p>


      <ErrorMessage name={props.text} component='div'/>
    </div>
  );
};

export default EditQuestion;
