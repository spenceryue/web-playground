import React from 'react';
import Question from './Question';
import EditQuestion from './EditQuestion';

const DidIQuestion = ({
  label,
  ...props}) =>
{
  if (!props.editing)
  {
    return (
      <Question 
        label={'Did I ' + label + ' Today?'}
      {...props} />
    )
  }
  else
  {
    return (
      <EditQuestion
        label={label}
      {...props} />
    )
  }
};

export default DidIQuestion;
