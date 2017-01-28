'use strict';

// Chai expectations: http://chaijs.com/api/bdd/
var expect = require('chai').expect;

var QA = require('./qa');
var qa = new QA();

describe('QA', function () {
  it('has a proper greeting', function () {
    // console.log(qa.greeting);
    expect(qa.greeting).to.contain('Howdy');
    expect(qa.greeting).to.contain('Say help');
  });

  it('has the right map', function () {
    // console.log(qa.map);
    expect(qa.map).to.have.property('later');
    expect(qa.map['later']).to.contain('trout');

    expect(qa.map).to.have.property('elk joke');
    expect(qa.map['elk joke']).to.contain('elevation');

    expect(qa.map).to.have.property('mountain weather forecast');
    expect(qa.map['mountain weather forecast']).to.contain('<audio src=');

    // help should contain every Q except 'help'
    expect(qa.map).to.have.property('help');
    expect(qa.map['help']).to.contain('You can say');
    for (var key in qa.map) {
      if (key !== 'help') {
        expect(qa.map['help']).to.contain(key);
      }
    }
  });

  it('has proper no_response', function () {
    // console.log(qa.no_inputs);
    expect(qa.no_inputs).to.have.lengthOf(3);
  });
});
