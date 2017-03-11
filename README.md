# node-nock-example

All examples are for [nock](https://github.com/node-nock/nock) using [mocha](https://mochajs.org/).

## Using isDone() and cleanAll() in afterEach()

Include the following to ensure `nock` interceptors don't affect other tests (and make debugging hard):

```js
afterEach(function() {
  ...
  if(!nock.isDone()) {
    this.test.error(new Error('Not all nock interceptors were used!'));
    nock.cleanAll();
  }
  ...
});
```

See the difference in action. The bug is with the `GET / five times` test; it was only consuming one of the `nock` interceptors.

```
> npm test test/aftereach-isdone/server-original.js

  server-original
    √ GET / once (46ms)
    √ GET / five times
    1) GET / fails gracefully if example.com is down


  2 passing (76ms)
  1 failing

  1) server-original GET / fails gracefully if example.com is down:
     AssertionError: expected 200 to equal 503
      at test\aftereach-isdone\server-original.js:38:29
```
```
> npm test test/aftereach-isdone/server-improved.js

  server-improved
    √ GET / once (47ms)
    √ GET / five times
    1) GET / five times
    √ GET / fails gracefully if example.com is down


  3 passing (78ms)
  1 failing

  1) server-improved GET / five times:
     Error: Not all nock interceptors were used!
      at Context.<anonymous> (test\aftereach-isdone\server-improved.js:12:23)
```
