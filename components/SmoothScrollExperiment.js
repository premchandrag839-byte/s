import { useEffect, useRef } from 'react';

/**
 * SmoothScrollExperiment
 * - Client-only wrapper that wires Lenis smooth scrolling with GSAP ScrollTrigger
 * - Adds example fade-in / up / scale animations for elements with class `.section`
 * - Fully removable: delete this file and its usage in `_app.js` to revert site
 */
export default function SmoothScrollExperiment({ children }) {
  const lenisRef = useRef(null);
  const tickerRef = useRef(null);

  useEffect(() => {
    let isCancelled = false;
    let gsap = null;
    let ScrollTrigger = null;
    let prevScrollBehavior = '';

    async function setup() {
      // Dynamically import to avoid SSR issues
      const [{ default: Lenis }, gsapModule, stModule] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      if (isCancelled) return;

      gsap = gsapModule.gsap || gsapModule.default || gsapModule;
      ScrollTrigger = stModule.ScrollTrigger || stModule.default;
      gsap.registerPlugin(ScrollTrigger);

      // Avoid double smoothing with native CSS smooth scroll while Lenis is active
      const rootEl = document.documentElement;
      prevScrollBehavior = rootEl.style.scrollBehavior;
      rootEl.style.scrollBehavior = 'auto';

      // Initialize Lenis without autoRaf so GSAP controls the timing
      const lenis = new Lenis({
        autoRaf: false,
        smoothWheel: true,
        smoothTouch: false,
        // Make anchor link clicks buttery smooth (see docs)
        anchors: true,
      });
      lenisRef.current = lenis;

      // Keep ScrollTrigger in sync with Lenis scroll
      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      // Drive Lenis via GSAP ticker (recommended integration)
      tickerRef.current = (time) => {
        // GSAP ticker time is in seconds; Lenis expects ms
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerRef.current);
      gsap.ticker.lagSmoothing(0);

      // Example animations for `.section` elements
      const sections = gsap.utils.toArray('.section');
      sections.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          scale: 0.98,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Recalculate on layout changes
      ScrollTrigger.refresh();
    }

    setup();

    return () => {
      isCancelled = true;

      try {
        // Kill all ScrollTriggers created here
        const st = require('gsap/ScrollTrigger');
        const g = require('gsap');
        const ScrollTriggerLocal = st.ScrollTrigger || st.default;
        const gsapLocal = g.gsap || g.default || g;

        if (tickerRef.current && gsapLocal && gsapLocal.ticker) {
          gsapLocal.ticker.remove(tickerRef.current);
        }
        if (ScrollTriggerLocal) {
          ScrollTriggerLocal.getAll().forEach((t) => t.kill());
          ScrollTriggerLocal.clearMatchMedia && ScrollTriggerLocal.clearMatchMedia();
        }
      } catch (_) {
        // no-op if modules aren't available during cleanup
      }

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      // Restore previous native behavior
      try {
        const rootEl = document.documentElement;
        rootEl.style.scrollBehavior = prevScrollBehavior || '';
      } catch (_) {}
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
}


