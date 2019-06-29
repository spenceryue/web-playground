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
        id={name + 'y'}
        presetValue={'yes'}
        label='Yes'
      />
      <Field
        component={RadioButton}
        name={name}
        id={name + 'n'}
        presetValue={'no'}
        label='No'
      />
    </RadioGroup>
  )
};

export default Question;
