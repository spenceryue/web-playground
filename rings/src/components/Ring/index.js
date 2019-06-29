import React from 'react';
import './ring.css';

const Ring = () => 
(
  <svg
    height='100'
    width='100'
    class='canvas'
  >
    <path
      class='ring'
      d='M50 34.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831'
      fill='none'
      stroke='#444'
      stroke-width='1'
      stroke-dasharray='75, 100'
    />
  </svg>
)

export default Ring;
