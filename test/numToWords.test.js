import { numToWords } from '../src/';

describe('numToWords', function () {
  const textForNumbers = {
    1: 'one',
    10: 'ten',
    20: 'twenty',
    21: 'twenty-one',
    55: 'fifty-five',
    101: 'one hundred one',
    1234: 'one thousand two hundred thirty-four',
    1000000001: 'one billion one',
    1000000000000025: 'one thousand trillion twenty-five'
  };

  for (const [number, text] of Object.entries(textForNumbers)) {
    it(`returns "${text}" for the number ${number}`, function () {
      numToWords(number).should.equal(text);
    });

    it(`returns "negative ${text}" for the number -${number}`, function () {
      numToWords(number * -1).should.equal(`negative ${text}`);
    });
  };

  it('returns "not a number" when given anything other than a number', function () {
    numToWords('test').should.equal('not a number');
    numToWords({}).should.equal('not a number');
    numToWords(true).should.equal('not a number');
    numToWords(false).should.equal('not a number');
    numToWords(null).should.equal('not a number');
    numToWords(undefined).should.equal('not a number');
  });
});
