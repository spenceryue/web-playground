import React from 'react';
import DidIQuestion from './DidIQuestion';

const Question = ({ question, ...props }) =>
{
  if (question.type == 'didi')
  {
    return <DidIQuestion
      question={question}
      props
    />
  }
}

export default Question;
