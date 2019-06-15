import React from 'react';
import { RadioGroup, RadioButton } from '../RadioComponent';
import { Field, ErrorMessage }  from 'formik';
import StringHash from 'string-hash';
import classNames from 'classnames';

const DidIQuestion = (props) =>
(
  <RadioGroup
    id={props.text}
    label={'Did I ' + props.text + ' today?'}
  >
		<div>{props.error}
		</div>
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

export default DidIQuestion;
