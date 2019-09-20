import { numToWords } from '../src/';

describe('numToWordsBritish', function () {
  // See https://www.mathsisfun.com/numbers/counting-names-1000.html
  const textForNumbers = {
    1: 'one',
    10: 'ten',
    20: 'twenty',
    21: 'twenty-one',
    53: 'fifty-three',
    55: 'fifty-five',
    60: 'sixty',
    72: 'seventy-two',
    99: 'ninety-nine',
    101: 'one hundred and one',
    116: 'one hundred and sixteen',
    144: 'one hundred and forty-four',
    212: 'two hundred and twelve',
    271: 'two hundred and seventy-one',
    621: 'six hundred and twenty-one',
    999: 'nine hundred and ninety-nine',
    1101: 'one thousand, one hundred and one',
    1234: 'one thousand, two hundred and thirty-four',
    15016: 'fifteen thousand, and sixteen',
    112621: 'one hundred and twelve thousand, six hundred and twenty-one',
    999999: 'nine hundred and ninety-nine thousand, nine hundred and ninety-nine',
    1006101: 'one million, six thousand, one hundred and one',
    191232891: 'one hundred and ninety-one million, two hundred and thirty-two thousand, eight hundred and ninety-one',
    999999999: 'nine hundred and ninety-nine million, nine hundred and ninety-nine thousand, nine hundred and ninety-nine',
    1000000001: 'one billion, and one',
    1000000000000025: 'one thousand trillion, and twenty-five'
  };

  for (const [number, text] of Object.entries(textForNumbers)) {
    it(`returns "${text}" for the number ${number}`, function () {
      numToWords(number, { ands: true, commas: true }).should.equal(text);
    });

    it(`returns "negative ${text}" for the number -${number}`, function () {
      numToWords(number * -1, { ands: true, commas: true }).should.equal(`negative ${text}`);
    });
  };
});
