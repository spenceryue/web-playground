import React from 'react';
import { RadioGroup, RadioButton } from '../../RadioComponent';
import { Field }  from 'formik';
import StringHash from 'string-hash';

const BinaryQuestion = (props) =>
(
  <RadioGroup
    id={props.text}
    label={props.text}
  >
    <Field
      component={RadioButton}
      name={StringHash(props.text)}
      id={'yes'}
      label='Yes'
    />

    <Field
      component={RadioButton}
      name={StringHash(props.text)}
      id={'no'}
      label='No'
    />
  </RadioGroup>

);

export default BinaryQuestion;
