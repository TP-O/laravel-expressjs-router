# laravel-expressjs-router
Express router based on laravel router.

## Installation
```bash
yarn add laravel-expressjs-router
```
## Start

```
app
└── src
    ├── controllers
    │   ├── abc
    │   │   └── test.controller.js
    │   │
    │   └── other.controller.js
    │
    ├── middelware
    │   ├── middeware01.js
    │   └── middeware02.js
    │
    └── index.js
```

```js
// test.controller.js
class TestController {
  index(req, res) {
    res.status(200).json({
      tests: [],
    });
  }

  store(req, res) {
    res.status(201).json({
      id: req.body.id,
      title: req.body.title,
    });
  }

  update(req, res) {
    res.status(200).json({
      id: req.params.id,
      title: req.body.title,
    });
  }

  destroy(req, res) {
    res.status(200).json({
      id: req.params.id,
    });
  }
}

module.exports.default = new TestController();
```

```js
// middleware01.js
import { NextFunction, Request, Response } from "express";

class Middleware01 {
  handle (req: Request, res: Response, next: NextFunction) {
    console.log('Passed middleware01');
    next();
  }
}

module.exports.default = new Middleware01();
```

```js
// middleware02.ts
import { NextFunction, Request, Response } from "express";

class Middleware02 {
  handle (req: Request, res: Response, next: NextFunction) {
    console.log('Passed middleware02');
    next();
  }
}

module.exports.default = new Middleware02();
```

```js
// index.js
const express = require('express');
const  { lrouter } = require('laravel-epxress-router');

const app = express();
const router = lrouter(app.Router(), __dirname, '/controllers', '/middleware');

router.group(
  {
    prefix: '/api/v1',
    namespace: 'abc',
    middleware: ['middleware01'],
  },
  () => {
    router.get('/', (req, res) => { /* handle */ });

    router.group({ prefix: '/tests' }, () => {
        router.get('/', 'test.controller@index');
        router.post('/', 'test.controller@store');
        router.put('/:id', 'test.controller@update');
        router.delete('/:id', 'test.controller@destroy');
      },
    );

    router.get('/pass', (req, res) => { /* handle */ }, 'middleware02'/*, 'other middleware' */,
    );
  },
);

app.use(router.init());
```
