import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * IphoneUnlockObserver
 * - Intersection Observer that applies a one-time iPhone unlock animation
 * - Targets elements with the `card` class only
 * - Modular: remove this file and its import to disable
 */
export default function IphoneUnlockObserver() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const animatedOnceAttr = 'data-iphone-unlocked';
    const armedAttr = 'data-iphone-armed';

    const prepare = (el) => {
      if (el.getAttribute(animatedOnceAttr) === 'true') return;
      if (el.getAttribute(armedAttr) === 'true') return;
      el.style.transform = 'scale(1.2)';
      el.style.opacity = '0';
      el.style.willChange = 'transform, opacity';
      el.setAttribute(armedAttr, 'true');
    };

    const armAll = () => {
      const cards = Array.from(document.querySelectorAll('.card'));
      cards.forEach(prepare);
    };

    const onIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.getAttribute(animatedOnceAttr) === 'true') {
            observer.unobserve(el);
            return;
          }
          el.classList.add('iphone-unlock-animate');
          el.setAttribute(animatedOnceAttr, 'true');
          observer.unobserve(el);
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    });

    const observeAll = () => {
      const cards = Array.from(document.querySelectorAll('.card'));
      cards.forEach((el) => {
        if (el.getAttribute(animatedOnceAttr) !== 'true') {
          observer.observe(el);
        }
      });
    };

    // Initial scan
    armAll();
    observeAll();

    // Re-scan on route changes (SPA behavior)
    const handleRoute = () => {
      // Wait a frame for new DOM
      requestAnimationFrame(() => {
        armAll();
        observeAll();
      });
    };
    router.events.on('routeChangeComplete', handleRoute);

    // Mutation observer to catch dynamically added cards on the same route
    const mo = new MutationObserver((mutations) => {
      let shouldRescan = false;
      for (const m of mutations) {
        if (m.addedNodes && m.addedNodes.length) {
          shouldRescan = true;
          break;
        }
      }
      if (shouldRescan) {
        armAll();
        observeAll();
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      router.events.off('routeChangeComplete', handleRoute);
      mo.disconnect();
      observer.disconnect();
    };
  }, [router.events]);

  return null;
}


