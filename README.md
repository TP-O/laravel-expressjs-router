# laravel-express-router
Express router based on laravel router.

## Installation
```bash
yarn add laravel-express-router
```
## Start

```
app
└── src
    └── controllers
        ├── abc
        │    └── test.controller.js
        └── other.controller.js
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

module.exports default new TestController();
```

```js
// index.js
const express = require('express');
const  { lrouter } = require('laravel-epxress-router');

const app = express();
const router = lrouter(app.Router(), '/src/controllers');

router.group(
  {
    prefix: '/api/v1',
    namespace: 'abc',
    middleware: [middleware01],
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

    router.get('/pass', (req, res) => { /* handle */ }, [middleware02],
    );
  },
);

app.use(router.init());
```
