import React from 'react';
import './logo.css';
import * as TAGS from './tags';

const Logo = () => (
  <div>
  <p><b>D</b>id <b>I d</b>o.<b>t</b>oday</p>
  <p className='tag'>{TAGS.TAGS[Math.floor(Math.random() * TAGS.TAGS.length)]}</p>
  </div>
)

export default Logo;
