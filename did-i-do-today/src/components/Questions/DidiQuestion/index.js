import React from 'react';
import Question from './Question';
import EditQuestion from './EditQuestion';

const DidIQuestion = ({...props}) =>
{
  if (!props.editing)
  {
    return (
      <Question {...props} />
    )
  }
  else
  {
    return (
      <EditQuestion {...props} />
    )
  }
};

export default DidIQuestion;
