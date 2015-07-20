# is-fail

Tiny [node.js](http://nodejs.org)/[io.js](http://iojs.org) package implementing multiple strategies to verify if an HTTP request was failed, based on both error and HTTP response code.

Useful to combine with a retry/backoff logic. Allows you to plug in additional strategies

## Installation

```
npm install is-fail --save
```

## Usage

Simple usage as part of a retry mechanism
```js
const http = require('http')
const isFail = require('is-fail')()

function doRequest() {
  http.request('http://inconsistent-server', function (res) {
    if (isFail(res)) {
      return doRequest() // retry!
    }
    console.error('Response received')
  })
  .on('error', function (err) {
    if (isFail(err)) {
      return doRequest() // retry!
    }
    console.error('The request failed')
  })
}

doRequest()
```

Plug in additional strategies

```js
const http = require('http')
const isFail = require('is-fail')()

function notFoundStrategy(err, res) {
  return res.statusCode === 404
}

const checkFail = isFail([ notFoundStrategy ])

http.request('http://inconsistent-server', function (res) {
  if (checkFail(res)) {
    console.log('Failed request!')
  }
})
```

## API

#### isFail([ strategies ]) `=>` Function(err, res) `=>` Boolean

#### isFail.strategies `=` Array[ Strategy ]

#### isFail.check(strategies, err, res) `=>` Boolean

#### isFail.errors `=` Array[ ErrorStrategy ]

#### isFail.status `=` Array[ StatusStrategy ]

## License

MIT - Tomas Aparicio
