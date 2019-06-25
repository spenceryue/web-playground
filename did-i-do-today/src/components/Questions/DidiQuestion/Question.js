import React from 'react';
import { Field }  from 'formik';
import { RadioGroup, RadioButton } from '../../RadioComponent';
import StringHash from 'string-hash';

const Question = ({
  name,
  label,
  value,
  error,
  touched,
  ...props}) =>
{
  return (
    <RadioGroup
      id={name}
      label={label}
      value={value}
      error={error}
      touched={touched}
    >
      <Field
        component={RadioButton}
        name={name}
        id='yes'
        label='Yes'
      />
      <Field
        component={RadioButton}
        name={name}
        id='no'
        label='No'
      />
    </RadioGroup>
  )
};

export default Question;
