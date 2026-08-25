import '../styles/globals.css'; // Adjust path if needed
import Script from 'next/script';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import SmoothScrollExperiment from '../components/SmoothScrollExperiment';
import IphoneUnlockObserver from '../components/IphoneUnlockObserver';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // First-load loader controller
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loader = document.getElementById('app-loader');
    if (!loader) return; // no overlay

    const isDev = process.env.NODE_ENV !== 'production';
    const params = new URLSearchParams(window.location.search || '');
    const forceShow = params.get('showLoader') === '1';
    const skipOnceCheck = isDev || forceShow; // always show in dev or when ?showLoader=1

    const alreadyDone = sessionStorage.getItem('appLoaderDone') === '1';
    if (!skipOnceCheck && alreadyDone) {
      // Ensure it's hidden/removed immediately on subsequent visits in this session
      loader.classList.add('app-loader--hide');
      setTimeout(() => loader.remove(), 100);
      return;
    }

    const waitForImages = () => {
      const imgs = Array.from(document.images || []);
      if (imgs.length === 0) return Promise.resolve();
      const promises = imgs.map((img) => {
        const settle = () => (img.decode ? img.decode().catch(() => {}) : Promise.resolve());
        if (img.complete && img.naturalWidth !== 0) return settle();
        return new Promise((resolve) => {
          const done = () => settle().finally(resolve);
          img.addEventListener('load', done, { once: true });
          img.addEventListener('error', done, { once: true });
        });
      });
      return Promise.all(promises);
    };

    const needVanta = !!document.querySelector('.vanta-layer');
    const waitForVanta = () => {
      if (!needVanta) return Promise.resolve();
      if (window.__vantaReady) return Promise.resolve();
      return new Promise((resolve) => {
        const onReady = () => {
          window.removeEventListener('vanta-ready', onReady);
          resolve();
        };
        window.addEventListener('vanta-ready', onReady, { once: true });
        // Absolute fail-safe timeout
        setTimeout(resolve, 6000);
      });
    };

    // Ensure fonts are ready and first paint occurred before starting text animations
    const startLoaderAnimations = async () => {
      try {
        const fontsReady = (document.fonts && document.fonts.ready)
          ? Promise.race([
              document.fonts.ready,
              new Promise((r) => setTimeout(r, 1000)), // 1s cap
            ])
          : Promise.resolve();
        await fontsReady;
      } catch (_) {}
      // start after first paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          loader.classList.add('loader-animate');
        });
      });
    };

    startLoaderAnimations();

    // Wait for the loader text animations to complete (title typing + subtitle fade)
    const waitForTextAnimations = () => {
      const title = document.querySelector('#app-loader .title');
      const subtitle = document.querySelector('#app-loader .subtitle');
      if (!title && !subtitle) return Promise.resolve();
      return new Promise((resolve) => {
        let titleDone = !title;
        let subtitleDone = !subtitle;
        const check = () => { if (titleDone && subtitleDone) resolve(); };
        if (title) {
          const onTitleEnd = () => { titleDone = true; check(); };
          title.addEventListener('animationend', onTitleEnd, { once: true });
        }
        if (subtitle) {
          const onSubEnd = () => { subtitleDone = true; check(); };
          subtitle.addEventListener('animationend', onSubEnd, { once: true });
        }
        // Safety: if events don't fire, resolve shortly after expected total (1.6s + 0.9s) ~2.5s
        setTimeout(resolve, 2700);
      });
    };

    // Only gate on text animations finishing; overall hard cap ~2.8s
    const maxWait = new Promise((resolve) => setTimeout(resolve, 2800));
    Promise.race([waitForTextAnimations(), maxWait])
      .catch(() => {})
      .finally(() => {
        // Smooth fade and remove
        requestAnimationFrame(() => {
          loader.classList.add('app-loader--hide');
          setTimeout(() => {
            loader.remove();
            // Remember as done only when not overridden (i.e., production without ?showLoader=1)
            if (!skipOnceCheck) {
              sessionStorage.setItem('appLoaderDone', '1');
            }
          }, 550);
        });
      });
  }, []);
  return (
    <>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" 
        strategy="beforeInteractive" 
      />
      <Script 
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js" 
        strategy="beforeInteractive" 
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <SmoothScrollExperiment>
        <div className="min-h-screen flex flex-col">
          <Navbar /> {/* Add navigation here */}
          <main className="flex-grow pt-16"> {/* Ensure spacing below the Navbar */}
            <IphoneUnlockObserver />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={router.asPath}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
            {/* Removed floating Admission button as requested */}
          </main>
        </div>
      </SmoothScrollExperiment>
    </>
  );
}

export default MyApp;
