import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* viewport meta moved to _app.js to satisfy Next.js guidance */}
        <meta name="theme-color" content="#1d4ed8" />
        <meta name="description" content="AKASH INTER COLLEGE - HUSAINGANJ, FATEHPUR 212651 (U.P.). Admissions open. Explore academics, facilities, and campus life." />
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* Third-party stylesheet loaded via Document to satisfy Next.js guidance */}
        <link rel="stylesheet" href="https://unpkg.com/lenis@1.3.8/dist/lenis.css" />
        {/* Inline critical CSS for first-paint loader */}
        <style dangerouslySetInnerHTML={{ __html: `
          #app-loader { position: fixed; inset: 0; z-index: 999999; background: radial-gradient(circle at center, #0f2f2f, #0a0a1a); display: grid; place-items: center; opacity: 1; transition: opacity .5s ease; }
          #app-loader.app-loader--hide { opacity: 0; pointer-events: none; }

          /* Akash Inter College loader styles */
          #app-loader .loader { text-align: center; color: #fff; font-family: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
          #app-loader .bars { display: flex; justify-content: center; margin-bottom: 20px; }
          #app-loader .bar { width: 12px; height: 50px; margin: 0 6px; background: linear-gradient(180deg, #00ff99, #ffcc00); border-radius: 6px; animation: bounce 1.2s infinite ease-in-out; box-shadow: 0 0 18px rgba(0,255,153,.45); }
          #app-loader .bar:nth-child(2) { animation-delay: .15s; }
          #app-loader .bar:nth-child(3) { animation-delay: .3s; }
          @keyframes bounce { 0%,80%,100% { transform: scaleY(.4);} 40% { transform: scaleY(1);} }

          #app-loader .title { font-size: 28px; font-weight: 700; background: linear-gradient(90deg, #00ffcc, #ffcc00); -webkit-background-clip: text; -webkit-text-fill-color: transparent; white-space: nowrap; overflow: hidden; border-right: 2px solid #ffcc00; width: 0; margin: 0 auto; display: block; }
          #app-loader.loader-animate .title { animation: typingTitle 1.6s steps(22) 1 forwards; }
          @keyframes typingTitle { from { width: 0 } to { width: 330px } }

          #app-loader .subtitle { font-size: 18px; font-weight: 700; background: linear-gradient(90deg, #00ffcc, #ffcc00); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 10px auto 0; display: block; opacity: 0; transform: translateY(20px); }
          #app-loader.loader-animate .subtitle { animation: fadeUp .9s ease forwards; animation-delay: 1.6s; }
          @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); letter-spacing: 2px;} to { opacity: 1; transform: translateY(0); letter-spacing: 0;} }

          #app-loader .progress { margin-top: 30px; height: 4px; width: 380px; max-width: 78vw; background: #333; border-radius: 10px; overflow: hidden; position: relative; margin-left: auto; margin-right: auto; }
          #app-loader .progress::before { content: ""; position: absolute; height: 100%; width: 50%; left: -50%; background: linear-gradient(90deg, #00ffcc, #ffcc00, #00ffcc); animation: move 2s linear infinite; }
          @keyframes move { 100% { left: 100%; } }
        `}} />
      </Head>
      <body className="bg-white text-gray-900">
        {/* First paint loader overlay using the requested Akash Inter College loader */}
        <div id="app-loader" aria-hidden="true">
          <div className="loader" aria-label="Loading" role="img">
            <div className="bars">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <div className="title">AKASH INTER COLLEGE</div>
            <div className="subtitle">IMMERSIVE EDUCATION EXPERIENCE</div>
            <div className="progress"></div>
          </div>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
