'use strict';
const request = require('superagent');

const express = require('express');
const app = express();

app.get('/', function(req, res) {
  request
    .get('https://www.example.com')
    .then(response => res.send(response.text))
    .catch(response => res.status(503).send('Error'));
});

app.listen(3000);
module.exports = app;
