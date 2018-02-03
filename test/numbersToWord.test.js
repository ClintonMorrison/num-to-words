import { numberToWords } from '../src/';

describe('numbersToWords', function () {
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
      numberToWords(number).should.equal(text);
    });

    it(`returns "negative ${text}" for the number -${number}`, function () {
      numberToWords(number * -1).should.equal(`negative ${text}`);
    });
  };

  it('returns "not a number" when given anything other than a number', function () {
    numberToWords('test').should.equal('not a number');
    numberToWords({}).should.equal('not a number');
    numberToWords(true).should.equal('not a number');
    numberToWords(false).should.equal('not a number');
    numberToWords(null).should.equal('not a number');
    numberToWords(undefined).should.equal('not a number');
  });
});
