import React from 'react';
import './logo.css';
import * as TAGS from './tags';
import * as $ from './utils';

const num = Math.floor(Math.random() * TAGS.TAGS.length);

const Logo = (props) =>
{
  props = $.deepAssign(
		{
			// must supply an even number of options
			options: ["do", "drink", "poop", "sleep", "eat", "dance"],
			style: {
				// must be in pixels... (else get library that does CSS unit conversions)
				fontSize: `50px`,
				// must be in units of "multiples of font size"
				lineHeight: 1.2
			},
			// units are in milliseconds
			transition: 1000 / 2,
			delay: 1000 / 2,
			iterations: 1,
			lastTransition: 1000 / 4,
			animate: {
				translation: true,
				opacityBlur: true,
				underlineColor: false
			},
			colorMapper: i => `hsl(${360 * Math.random()}deg, 75%, 50%)`
    },
    props
  );

  props.options.push(props.options[0]);
  props.style['--lineHeight'] = props.style.lineHeight;


  return (
    <div>
      <p id='logo'><b>D</b>id <b>I d</b>o.<b>t</b>oday</p>

      <p className='tag'>{TAGS.TAGS[num]}</p>
    </div>
  )
}

export default Logo;
