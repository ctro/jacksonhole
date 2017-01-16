'use strict';

var expect = require('chai').expect;

var app = require('./app.js');
app.respond('this');

describe('Jackson Locals RawInput', function () {
  it('responds to later', function () {
    // var hum = a.respond("this")

    expect(1 + 1) === 2;
  });
});
