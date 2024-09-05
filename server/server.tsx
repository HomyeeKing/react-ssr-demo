/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import express from 'express';
import compress from 'compression';
import render from './render';
import { JS_BUNDLE_DELAY } from './delay';

const PORT = process.env.PORT || 4000;
const app = express();

app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    // Artificially delay serving JS
    // to demonstrate streaming HTML.
    setTimeout(next, JS_BUNDLE_DELAY);
  } else {
    next();
  }
});

app.use(compress());
app.get(
  '/',
  handleErrors(async function (req: any, res: any) {
    render(req.url, res);
  })
);
app.use(express.static('dist'));
app.use(express.static('public'));

app
  .listen(PORT, () => {
    console.log(`Listening at ${PORT}...`);
  })
  .on('error', function (error: any) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const isPipe = (portOrPipe: any) => Number.isNaN(portOrPipe);
    const bind = isPipe(PORT) ? 'Pipe ' + PORT : 'Port ' + PORT;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

function handleErrors(fn: any) {
  return async function (req: any, res: any, next: any) {
    try {
      return await fn(req, res);
    } catch (x) {
      next(x);
    }
  };
}
