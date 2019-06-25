import React from 'react';
import { RadioGroup, RadioButton } from '../../RadioComponent';
import { Field }  from 'formik';
import StringHash from 'string-hash';

const BinaryQuestion = (props) =>
{
  if (props.editing) {
    return (
      <div/>
    )
  }
  else
  {
    return (
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
  }
};

export default BinaryQuestion;
