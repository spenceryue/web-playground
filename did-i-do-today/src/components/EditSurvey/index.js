import React from 'react';
import EditSurvey from './EditSurvey';

const onClick = values =>
{
  const questionsToSubmit = [{
    value: values.questions[0].value,
    type: values.questions[0].type,
  }];

  values.questions.forEach((question) =>
    {
      questionsToSubmit.forEach((submitQuestion) =>
        {
          if (submitQuestion.value !== question.value || submitQuestion.type !== question.type)
          {
            questionsToSubmit.push(
              {
                value: question.value,
                type: question.type
              }
            )
          }
        });
    });
}

const EditSurveyPage = () =>
  (
    <EditSurvey
      onSubmit={onClick}
    />
  )

export default EditSurveyPage;
