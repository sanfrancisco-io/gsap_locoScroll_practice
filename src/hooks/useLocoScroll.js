import locomotiveScroll from 'locomotive-scroll';
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import '../styles/locoStyle.css';
gsap.registerPlugin(ScrollTrigger);


export default function useLocoScroll(start) {
  useEffect(() => {
    if (!start) return;

    const scrollEl = document.querySelector('#main-container');
    let locoScroll = new locomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1,
      class: 'is-reveal',
    });

    locoScroll.on('scroll', () => {
      ScrollTrigger.update();
    });

    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        if (locoScroll) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
        }
        return null;
      },
      scrollLeft(value) {
        if (locoScroll) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.x;
        }
        return null;
      },
    });

    const lsUpdate = () => {
      if (locoScroll) {
        locoScroll.update();
      }
    };

    ScrollTrigger.addEventListener('refresh', lsUpdate);
    ScrollTrigger.refresh();

    return () => {
      if (locoScroll) {
        ScrollTrigger.removeEventListener('refresh', lsUpdate);
        locoScroll.destroy();
        locoScroll = null;
        console.log('Kill', locoScroll);
      }
    };
  }, [start]);
}
