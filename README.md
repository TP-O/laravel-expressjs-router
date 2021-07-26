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
});

// Create some routes here...

const app = express();
app.use(router.init());
```

## Usage

### Method options
You can call methods of controllers or middleware without importing them by declaring `controllerPath` and `middlewarePath` when initializing the router and exporting `default`.  
Supported method: `get`, `post`, `put`, `path`, `delete`.

```js
const router = lrouter({
  router: express.Router(),
  currentDir: __dirname,
  controllerPath: '/controllers',
  middlewarePath: '/middleware',
});
```   
You have **2** ways to initialize a route:

```js
const controllerA = require('<current_dir>/controllers/controllerA');

router.get({
  path: '/',
  action: , controllerA.all,
  middleware: ['middlewareA@handle'],
});
```

```js
router.get({
  path: '/',
  action: 'controllerA@all',
  middleware: ['middlewareA@handle'],
});
```

**Warning:** this does not work if you are using webpack to build the project.

### Group options
Group the routes have the same options.

```js
router.group({
  prefix: '/api/v1', // url prefix for all sub-routes
  namespace: 'api', // controller namespace for all sub-routes (dynamic calls only)
  middleware: [ // middleware for all sub-routes
    'middlewareA@handle', // filename@method
    'middlewareB@handle:arg1,arg2', // filename@method:<argument 1>, ...
  ],
}, () => {
  router.get({
    path: '/',
    action: 'controllerA@all', // filename@method
    middleware: ['middlewareC.handle'],
  });
});
```
