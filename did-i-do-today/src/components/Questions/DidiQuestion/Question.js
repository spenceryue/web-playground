import React from 'react';
import { RadioButton } from '../../RadioComponent';
import { Field, ErrorMessage }  from 'formik';
import StringHash from 'string-hash';

const Question = ({...props}) =>
{
  return (
  <div>
    <div>{'Did I ' + props.text + ' today?'}</div>
    <Field
      component='select'
      name={StringHash(props.text)}
    >
      <option value='yes'>Yes</option>
      <option value='no'>No</option>
    </Field>


    <ErrorMessage name={StringHash(props.text)} component='div'/>
  </div>
  )
};

export default Question;
