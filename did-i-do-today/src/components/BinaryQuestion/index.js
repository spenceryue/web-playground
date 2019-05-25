import React from 'react';

const BinaryQuestion = (props) =>
(
  <div>{props.text}
    <br/>
    <input
      type='radio'
      id='positive'
    />
    <label htmlFor={'positive'}>Yes</label>

    <input
      type='radio'
      id='negative'
    />
    <label htmlFor={'negative'}>No</label>
  </div>
);

export default BinaryQuestion;
