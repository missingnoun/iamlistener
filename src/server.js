import http from 'http';

import app from './app.js';
import conf from './config/config.js';

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(conf.app.port || process.env.PORT || '8080');
const host = (conf.app.host || '0.0.0.0');

const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Server started listening on: http://${host}:${port}`);
});
