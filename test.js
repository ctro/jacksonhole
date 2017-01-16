'use strict';

var expect = require('chai').expect;

// This works, but throws `'app' is assigned a value but never used`
// var app = require('./app.js');

// I just want to test the responses somehow. This does not work:
// app.respond('this');

describe('Jackson Locals RawInput', function () {
  it('responds to later', function () {
    expect(1 + 1) === 2;
  });
});
