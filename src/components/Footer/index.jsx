import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import SectionHeader from '../SectionHeader';
import SplitText from '../../utils/Split3.min.js';
import gsap from 'gsap';

import './style.scss';
import useOnScreen from '../../hooks/useOnScreen';

const Footer = () => {
  const ref = useRef(null);

  const [reveal, setReveal] = useState(false);
  const onScreen = useOnScreen(ref, 0.5);

  useEffect(() => {
    if (onScreen) setReveal(onScreen);
  }, [onScreen]);

  useEffect(() => {
    if (reveal) {
      const split = new SplitText('#location-text', {
        type: 'lines',
        linesClass: 'lineChildren',
      });
      const splitParent = new SplitText('#location-text', {
        type: 'lines',
        linesClass: 'lineParent',
      });
      gsap.fromTo(
        split.lines,
        { y: -200 },
        {
          duration: 1,
          y: 0,
          // opacity: 1,
          stagger: 0.1,
          ease: 'power2',
        }
      );
    }
  }, [reveal]);

  return (
    <section className='footer' data-scroll-section>
      <SectionHeader title='Made in' />

      <h1
        className={classNames('location', { 'is-reveal': reveal })}
        id='location-text'
        ref={ref}
      >
        Rio de Janeiro
      </h1>
    </section>
  );
};

export default Footer;
