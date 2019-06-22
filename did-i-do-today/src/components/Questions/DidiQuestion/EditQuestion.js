import React from 'react';
import { RadioButton } from '../../RadioComponent';
import { Field, ErrorMessage }  from 'formik';
import StringHash from 'string-hash';

const EditQuestion = ({...props}) =>
{
  return (
    <div>
      <div>
        {'Did I '} 
      </div>
      <Field
        id={props.text}
        name={props.text}
        value={props.text}
      />
      <div>{'Today?'} </div>


      <ErrorMessage name={props.text} component='div'/>
    </div>
  )
};

export default EditQuestion;
