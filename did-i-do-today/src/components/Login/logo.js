import React from 'react';
import './logo.css';
import * as TAGS from './tags';

const num = Math.floor(Math.random() * TAGS.TAGS.length);

const Logo = () => (
  <div>
  <p id='logo'><b>D</b>id <b>I d</b>o.<b>t</b>oday</p>
  <p className='tag'>{TAGS.TAGS[num]}</p>
  </div>
)

export default Logo;
