import React from 'react';
import { Field, ErrorMessage } from 'formik';

const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type='radio'
        value={id}
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className={'radio-button'}
        {...props}
      />
      <label
        htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

const DidIQuestion = ({...props}) =>
{
  return (
    <div>

      <div>
        {props.text}
      </div>
      <Field
        component={RadioButton}
        name={props.text}
        id={'yes'}
        label='Yes'
      />
      <Field
        component={RadioButton}
        name={props.text}
        id={'no'}
        label='No'
      />
      <ErrorMessage name={props.text} component='div'/>

    </div>
  )
}

export default DidIQuestion;
