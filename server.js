// Minimal Next.js custom server for cPanel/Passenger
const { createServer } = require('http');
const next = require('next');
const url = require('url');

// Passenger ya cPanel apna PORT set karta hai, default 3000 rakha hai
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';

// Hamesha production mode enforce karte hain cPanel pe
const dev = false;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      try {
        const parsedUrl = url.parse(req.url, true);

        // Simple health check endpoint
        if (parsedUrl.pathname === '/healthz') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('ok');
          return;
        }

        handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Request error:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    }).listen(port, () => {
      console.log(
        `> Next.js server ready on http://localhost:${port} (env: production)`
      );
    });
  })
  .catch((err) => {
    console.error('> Error starting Next.js server:', err);
    process.exit(1);
  });
