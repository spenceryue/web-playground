import React from 'react';
import { Field, ErrorMessage } from 'formik';

const IntegerQuestion = ({...props}) =>
{
  return (
    <div>
      <Field type='number' name={props.text} />
      <ErrorMessage name={props.text} component='div'/>
    </div>
  )
}

export default IntegerQuestion;
