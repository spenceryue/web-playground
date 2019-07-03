import React from 'react';
import DidIQuestion from './DidIQuestion';
import StringHash from 'string-hash';

const EditQuestion = ({ question, ...props }) =>
{
  if (question.type == 'didi')
  {
    return <DidIQuestion
      question={question}
      {...props}
    />
  }
}

export default EditQuestion;
