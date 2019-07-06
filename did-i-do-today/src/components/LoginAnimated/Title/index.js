import React, { useRef } from "react";
import * as $ from "./utils";
import "./styles.css";

const Logo = props => {
  // merge default props
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
  // wrap last option back to first
  props.options.push(props.options[0]);
  // let styles.css know about this with a CSS variable.
  props.style["--lineHeight"] = props.style.lineHeight;

  // styles, layout, measurements
  const {
    GAP_WIDTH = Math.max(...props.options.map(o => o.length)),
    base = `Did I ${" ".repeat(GAP_WIDTH)}.today`,
    boldLetter = $.valueIf([0, 4, 6 + GAP_WIDTH, 6 + GAP_WIDTH + 1], "bold"),
    gapLetter = $.valueIf($.range(6, 6 + GAP_WIDTH), "gap")
  } = {};

  // calculated animation parameters
  const {
    OPTION_HEIGHT = parseFloat(props.style.fontSize) * props.style.lineHeight,
    FRAME_COUNT = props.options.length - 1,
    FRAME_TIME = props.transition + props.delay,
    ANIMATION_TIME = FRAME_TIME * FRAME_COUNT
  } = {};

  $.useEffect(function*() {
    const elem = optionsRef.current;

    // animation keyframe generators
    const {
      steps = () => $.range(2 * FRAME_COUNT + 1),
      frames = () => $.map(steps(), i => Math.floor(i / 2)),
      odds = () => $.map(steps(), i => i % 2),
      framePairs = () => $.zip(frames(), odds()),
      keyTimes = () =>
        $.map(
          framePairs(),
          ([frame, isOdd]) => FRAME_TIME * frame + props.transition * isOdd
        ),
      offsets = (total = ANIMATION_TIME) => $.map(keyTimes(), t => t / total)
    } = {};

    // translation animation (affects entire options container)
    if (props.animate.translation) {
      const animation = elem.animate(
        {
          offset: [...offsets()],
          transform: [
            ...$.map(
              framePairs(),
              ([frame, isOdd]) =>
                `translateY(${(frame + isOdd) * -OPTION_HEIGHT}px)`
            )
          ],
          opacity: [...$.map(odds(), odd => (odd ? 1 : 0.25))],
          // easings are repeated (cycled) as needed
          easing: ["cubic-bezier(.15,1.1,.32,.95)", "steps(1, end)"]
        },
        {
          duration: ANIMATION_TIME,
          iterations: props.iterations
        }
      );
      yield () => animation.cancel();
      document.querySelectorAll(".gap.letter").forEach(e => {
        e.animate(
          {
            color: ["black", "red"],
            width: ["1ch", ".4ch"]
          },
          {
            duration: props.lastTransition,
            delay: ANIMATION_TIME - FRAME_TIME,
            iteration: 1,
            fill: "forwards"
          }
        );
      });
      elem.lastChild.animate(
        {
          fontSize: ["1.5em", "1em"],
          lineHeight: ["inherit", "inherit"]
        },
        { duration: props.lastTransition, delay: ANIMATION_TIME - FRAME_TIME }
      );
    }

    // opacity and blur animation (uses different phase for even and odd indexed options)
    if (props.animate.opacityBlur) {
      const childAnimations = [
        ...$.map($.zip(odds(), elem.children), ([odd, child]) =>
          child.animate(
            {
              offset: [...$.head(offsets(FRAME_TIME * 2), 5)],
              // odd indexed options fade in first, hten fade out.
              // even indexed options are flipped.
              opacity: odd ? [0, 0.9, 1, 0.05, 0] : [1, 0.05, 0, 0.9, 1],
              filter: (odd ? [5, 0, 0, 5, 3] : [5, 3, 5, 0, 0]).map(
                x => `url(#blur${x})`
              ),
              // easings are repeated (cycled) as needed
              easing: ["cubic-bezier(.15,1.1,.32,.95)"]
            },
            {
              duration: FRAME_TIME * 2,
              iterations: props.iterations * Math.ceil(FRAME_COUNT / 2)
            }
          )
        )
      ];

      yield () => childAnimations.forEach(a => a.cancel());
    }
  });

  const optionsRef = useRef(null);
  return (
    <div className="logo-v1" style={props.style}>
      {/* Base */}
      <div className="base">
        {[...base].map((x, i) => (
          <span className={`letter ${boldLetter(i)} ${gapLetter(i)}`} key={i}>
            {x}
          </span>
        ))}
      </div>
      {/* Options */}
      <div className="options" ref={optionsRef}>
        {props.options.map((option, i) => (
          <div className="option" key={i}>
            {[...option].map((x, j) => (
              <span className="letter" key={j}>
                {x}
              </span>
            ))}
          </div>
        ))}
      </div>
      {/* SVG blur filter */}
      <svg style={{ display: "none" }}>
        <defs>
          <filter id="blur0">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0 0" />
          </filter>
          <filter id="blur3">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0 3" />
          </filter>
          <filter id="blur5">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0 5" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;
