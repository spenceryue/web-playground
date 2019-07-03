import React from 'react';
import DidIQuestion from './DidIQuestion';
import StringHash from 'string-hash';

const EditQuestion = ({ question, ...props }) =>
{
  if (question.type == 'didi')
  {
    return (<div>
        <DidIQuestion
          question={question}
          {...props}
        />
      </div>
    )
  }
}

export default EditQuestion;
