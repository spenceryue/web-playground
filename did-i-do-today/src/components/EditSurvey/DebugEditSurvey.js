import React from 'react';
import EditSurvey from './EditSurvey';

const onClick = values =>
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
  }, 500)

const EditSurveyPage = () =>
  (
    <EditSurvey
      onSubmit={onClick}
    />
  )

export default EditSurveyPage;
