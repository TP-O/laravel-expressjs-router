# laravel-expressjs-router
Express router based on laravel router.

## Installation
```bash
npm install laravel-expressjs-router
```

## Quickstart

Initialize router
```js
const express = require('express');
const { lrouter } = require('laravel-expressjs-router');

const router = lrouter({
  router: express.Router(),
  currentDir: __dirname,
  controllerPath: '/controllers', // path to controller directory from current directory
  middlewarePath: '/middleware', // path to middleware directory from current directory
});

// Create some routes here...

const app = express();
app.use(router.init());
```

Declare `controllerPath` and `controllerPath` when you want to call controller methods or middleware dynamically.

## Usage

### Group options
```js
const middleware = require('...');

router.group({
  prefix: '/api/v1', // url prefix for all sub-routes
  namespace: 'api', // controller namespace for all sub-routes (dynamic calls only)
  middleware: [ // middleware for all sub-routes
    'middleware01@handle', // filename@method
    'middleware02@handle:arg1,arg2', // filename@method:<argument 1>, ....
    middleware.handle(), // call middleware method directly
  ],
})
```

### Method options
Supported method: `get`, `post`, `put`, `path`, `delete`.

```js
const testcontroller = require('...');

router.get({
  path: '/',
  action: 'testcontroller@all', // filename@method
  middleware: ['middleware01@handle'],
});

router.post({
  path: '/',
  action: testcontroller.create,
});

```
