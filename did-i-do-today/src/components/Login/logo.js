import React from 'react';
import './logo.css';
import * as TAGS from './tags';

const Logo = () => (
  <p>
  <p><b>D</b>id <b>I d</b>o.<b>t</b>oday</p>
  <p className='tag'>{TAGS.TAGS[Math.floor(Math.random() * TAGS.TAGS.length)]}</p>
  </p>
)

export default Logo;
