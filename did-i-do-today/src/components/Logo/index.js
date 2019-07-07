import React, { useRef, useMemo } from 'react';
import './styles.css';
import { TAGS } from './tags';
import * as $ from './utils';

/**
 * How to use <Logo> props:
 *
 * @param options {string[]}      - the words that are cycled through in the animation
 *                                  (MUST give an even number of these unfortunately)
 * @param style {
 *   @param fontSize {string}     - font size of logo (MUST be in pixels, e.g. '70px')
 *   @param lineHeight {number}   - line height of logo (MUST be a ratio w.r.t. fontSize)
 * }
 * @param initialDelay {number}   - wait this long before the first animation starts
 * @param iterations {number}     - # of times to repeat the entire cycling animation
 * @param transition {number}     - time it takes to switch between options
 * @param delay {number}          - time to stay on one option
 * @param lastTransition {number} - time for the last option transition's font animation
 * @param rerunAfter {number}     - wait this long before repeating the animation
 *                                  (if iterations > 1)
 * @param animate {
 *   @param transition {boolean}  - whether to do the option switching (translation) animation
 *   @param opacityBlur {boolean} - whether to make options fade in and out
 * }
 */
export const Logo = props => {
  // merge default props
  props = $.deepAssign(
    {
      // must supply an even number of options
      options: [ 'do', 'drink', 'poop', 'sleep', 'eat', 'dance' ],
      style: {
        // must be in pixels... (else get library that does CSS unit conversions)
        // used to calculate the logo height
        fontSize: `70px`,
        // must be in units of "multiples of font size"
        lineHeight: 1.2,
        // feel free to add more CSS styles, but the above two are required.
      },
      // units are in milliseconds
      initialDelay: 1000,
      iterations: Infinity,
      transition: 1000 / 2,
      delay: 1000 / 2,
      lastTransition: 1000 / 4,
      // Change this value to tell the component to
      // reset all animations (useful for instance,
      // if any of the animation settings above changed).
      rerunAfter: 5000,
      animate: {
        translation: true,
        opacityBlur: true,
      },
    },
    props
  );
  // wrap last option back to first
  props.options.push('do');
  // let styles.css know about this with a CSS custom variable.
  props.style['--line-height'] = props.style.lineHeight;

  // styles, layout, measurements
  const {
    base = `Did I ${' '}.today`,
    boldLetter = $.valueIf([ 0, 4, 6 + 1, 6 + 2 ], 'bold'),
    gapLetter = $.valueIf($.range(6, 6 + 1), 'gap'),
  } = {};

  // calculated animation parameters
  const {
    OPTION_HEIGHT = parseFloat(props.style.fontSize) * props.style.lineHeight,
    // There are N - 1 transitions for N states.
    FRAME_COUNT = props.options.length - 1,
    FRAME_TIME = props.transition + props.delay,
    ANIMATION_TIME = FRAME_TIME * FRAME_COUNT,
  } = {};

  function* animate() {
    const elem = optionsRef.current;

    // animation keyframe generators
    const {
      steps = () => $.range(2 * FRAME_COUNT + 1),
      frames = () => $.map(steps(), i => Math.floor(i / 2)),
      odds = () => $.map(steps(), i => i % 2),
      framePairs = () => $.zip(frames(), odds()),
      keyTimes = () =>
        $.map(framePairs(), ([ frame, isOdd ]) => FRAME_TIME * frame + props.transition * isOdd),
      offsets = (total = ANIMATION_TIME) => $.map(keyTimes(), t => t / total),
    } = {};

    // translation animation (affects entire options container)
    if (props.animate.translation) {
      const animation = elem.animate(
        {
          offset: [ ...offsets() ],
          transform: [
            ...$.map(
              framePairs(),
              ([ frame, isOdd ]) => `translateY(${(frame + isOdd) * -OPTION_HEIGHT}px)`
            ),
          ],
          opacity: [ ...$.map(odds(), odd => (odd ? 1 : 0.25)) ],
          easing: [ 'cubic-bezier(.15,1.1,.32,.95)', 'steps(1, end)' ],
        },
        {
          duration: ANIMATION_TIME,
          iterations: 1,
        }
      );
      yield () => animation.cancel();

      // Change the width of the "gap letter" where new options appear.
      const gapAnimations = Array.from(document.querySelectorAll('.gap.letter'), e => {
        return e.animate(
          {
            offset: [ ...offsets() ],
            width: [
              ...$.map(
                framePairs(),
                ([ frame, isOdd ]) => `${props.options[frame + isOdd].length}ch`
              ),
            ],
            easing: [ 'cubic-bezier(.15,1.1,.32,.95)', 'steps(1, end)' ],
          },
          {
            duration: ANIMATION_TIME,
            iterations: 1,
            fill: 'both',
          }
        );
      });
      yield () => gapAnimations.forEach(a => a.cancel());

      // Make the last option grow a little before shrinking back down.
      const scaleAnimation = elem.lastChild.animate(
        {
          fontSize: [ '1.25em', '1em' ],
          lineHeight: [ 'inherit', 'inherit' ],
        },
        { duration: props.lastTransition, delay: ANIMATION_TIME - FRAME_TIME }
      );
      yield () => scaleAnimation.cancel();
    }

    // opacity and blur animation (uses different phase for even and odd indexed options)
    if (props.animate.opacityBlur) {
      const childAnimations = [
        ...$.map($.zip(odds(), elem.children), ([ odd, child ]) =>
          child.animate(
            {
              offset: [ ...$.head(offsets(FRAME_TIME * 2), 5) ],
              // odd indexed options fade in first, hten fade out.
              // even indexed options are flipped.
              opacity: odd ? [ 0, 0.9, 1, 0.05, 0 ] : [ 1, 0.05, 0, 0.9, 1 ],
              filter: (odd ? [ 5, 0, 0, 5, 3 ] : [ 5, 3, 5, 0, 0 ]).map(x => `url(#blur${x})`),
              // easings are repeated (cycled) as needed
              easing: [ 'cubic-bezier(.15,1.1,.32,.95)' ],
            },
            {
              duration: FRAME_TIME * 2,
              iterations: Math.ceil(FRAME_COUNT / 2),
            }
          )
        ),
      ];
      yield () => childAnimations.forEach(a => a.cancel());
    }
  }

  $.useEffect(
    async function*() {
      await $.sleep(props.initialDelay);
      for (let i = 0; i < props.iterations; i++) {
        yield* animate();
        await $.sleep(ANIMATION_TIME);
        await $.sleep(props.rerunAfter);
      }
    },
    [ props.rerunAfter ]
  );

  const tag = useMemo(() => TAGS[~~(TAGS.length * Math.random())], []);
  const optionsRef = useRef(null);
  return (
    // Prettier not recognizing <>
    <React.Fragment>
      <div className='logo' style={props.style}>
        {/* Base */}
        <div className='base'>
          {[ ...base ].map((x, i) => (
            <span className={`letter ${boldLetter(i)} ${gapLetter(i)}`} key={i}>
              {x}
            </span>
          ))}
        </div>
        {/* Options */}
        <div className='options' ref={optionsRef}>
          {props.options.map((option, i) => (
            <div className='option' key={i}>
              {[ ...option ].map((x, j) => (
                <span className='letter' key={j}>
                  {x}
                </span>
              ))}
            </div>
          ))}
        </div>
        {/* SVG blur filter (invisible definitions) */}
        <svg style={{ display: 'none' }}>
          <defs>
            <filter id='blur0'>
              <feGaussianBlur in='SourceGraphic' stdDeviation='0 0' />
            </filter>
            <filter id='blur3'>
              <feGaussianBlur in='SourceGraphic' stdDeviation='0 3' />
            </filter>
            <filter id='blur5'>
              <feGaussianBlur in='SourceGraphic' stdDeviation='0 5' />
            </filter>
          </defs>
        </svg>
      </div>
      {/* Tag */}
      <div className='tag'>{tag}</div>
    </React.Fragment>
  );
};
