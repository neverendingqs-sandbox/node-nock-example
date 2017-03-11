'use strict';
const assert = require('chai').assert;
const nock = require('nock');
const request = require('supertest');
const uniqueValue = 'da64daaf-182b-4af6-a4af-09727bf8d5aa';

const app = require('../../src/server');

describe('server-improved', function() {
  afterEach(function() {
    if(!nock.isDone()) {
      this.test.error(new Error('Not all nock interceptors were used!'));
      nock.cleanAll();
    }
  })
  it('GET / once', function() {
    nock('https://www.example.com')
      .get('/')
      .reply(200, uniqueValue);

    return request(app)
      .get('/')
      .then(res => assert.equal(res.text, uniqueValue));
  });

  it('GET / five times', function() {
    nock('https://www.example.com')
      .get('/')
      .times(5)
      .reply(200, uniqueValue);

    return request(app)
      .get('/')
      .then(res => assert.equal(res.text, uniqueValue));
  });

  it('GET / fails if example.com is down', function() {
      nock('https://www.example.com')
        .get('/')
        .reply(500);

      return request(app)
        .get('/')
        .then(res => assert.equal(res.status, 503));
    });
});
