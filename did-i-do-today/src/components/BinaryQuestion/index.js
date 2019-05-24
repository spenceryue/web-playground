import React from 'react';

const BinaryQuestion = (props) =>
(
  <div>{props.text}
    <br/>
    <button>Yes</button>
    <button>No</button>
  </div>
);

export default BinaryQuestion;
