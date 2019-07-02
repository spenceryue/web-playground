import React from 'react';
import DidIQuestion from './DidIQuestion';
import StringHash from 'string-hash';

const EditQuestion = ({ question, ...props }) =>
{
  console.log(question);
  if (question.type === undefined)
  {
    let tmp = question;

    question = {}
    question.type = 'didi';
    question.name = StringHash(question);
    question.value = tmp;
  }
  if (question.type == 'didi')
  {
    return <DidIQuestion
      question={question}
      {...props}
    />
  }
}

export default EditQuestion;
