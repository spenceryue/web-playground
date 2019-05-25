import React from 'react';
import { RadioGroup, RadioButton } from '../RadioComponent';
import { Field }  from 'formik';

const BinaryQuestion = (props) =>
(
  <RadioGroup
    id={props.text}
    label={props.text}
  >
    <Field
      component={RadioButton}
      name={props.text}
      id={props.text + 'yes'}
      label='Yes'
    />

    <Field
      component={RadioButton}
      name={props.text}
      id={props.text + 'no'}
      label='No'
    />
  </RadioGroup>

);

export default BinaryQuestion;
