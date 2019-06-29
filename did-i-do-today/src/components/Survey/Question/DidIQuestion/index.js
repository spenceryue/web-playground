import React from 'react';

import { Field }  from 'formik';
import { RadioGroup, RadioButton } from '../../../RadioComponent';

const DidIQuestion = ({ question, value, error, touched }) =>
{
  return (
    <RadioGroup
      id={question.name}
      label={'Did I ' + question.value + ' today?'}
      value={value}
      error={error}
      touched={touched}
    >
      <Field
        component={RadioButton}
        name={question.name}
        id={question.name + 'y'}
        presetValue={'yes'}
        label='Yes'
      />
      <Field
        component={RadioButton}
        name={question.name}
        id={question.name + 'n'}
        presetValue={'no'}
        label='No'
      />
    </RadioGroup>
  );
};

export default DidIQuestion;
