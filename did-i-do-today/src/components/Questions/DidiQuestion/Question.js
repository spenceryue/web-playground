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
      component={RadioButton}
      name={StringHash(props.text)}
      id={StringHash(props.text) + '|yes'}
      label='Yes'
    />

    <Field
      component={RadioButton}
      name={StringHash(props.text)}
      id={StringHash(props.text) + '|no'}
      label='No'
    />

    <ErrorMessage name={StringHash(props.text)} component='div'/>
  </div>
  )
};

export default Question;
