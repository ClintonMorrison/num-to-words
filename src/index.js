/**
 * This library provides a method for converting arbitrary integers into english/british text.
 * For example, it would convert the number '123456' to 'one hundred and twenty-three thousand, four hundred and fifty-six'
 *
 * All positive and negative integers are supported. Floating point numbers are rounded to integers
 * before being converted to words.
 *
 *
 * Examples:
 *   numToWords(0); // returns 'zero'
 *   numToWords(10001); // returns 'ten thousand one'
 *   numToWords(111); // returns 'one hundred eleven'
 *   numToWords(-77); // returns 'negative seventy-seven'
 *
 * @author Clinton Morrison <clintonmorrison2@gmail.com>, Emmanuel Guyot
 */
import { shouldPrefixWithOne, shouldHyphenate } from './util';
import { numbers, andWord } from './numbers';

/**
 * Converts a number into the corresponding series of english words
 *
 * Supported options:
 *   ands (boolean): true if ands should be added
 *   commas (boolean): true if commas should be added
 *
 * Examples:
 *  numToWords(0); // returns 'zero'
 *  numToWords(10001); // returns 'ten thousand one'
 *  numToWords(111, { ands: true });  // returns 'one hundred and eleven'
 *
 * @param {number} numToConvert
 * @param {object} options
 * @returns {string}
 */
export function numToWords (numToConvert, options = {}) {
  const andForBritish = options.ands || false;

  const comma = (options.commas ? ',' : '');
  const and = (andForBritish ? andWord + ' ' : '');
  let words = '';
  let prefixNum;
  let remainder;
  let closestSmallerNumber;
  let closestSmallerNumberText;

  numToConvert = parseInt(numToConvert, 10);

  if (isNaN(numToConvert)) {
    return 'not a number';
  }

  if (!isFinite(numToConvert)) {
    return 'infinity';
  }

  if (numToConvert < 0) {
    words += 'negative ';
    numToConvert *= -1;
  }

  // Search list of numbers for closest smaller number.
  // numToConvert will be written in terms of this number.
  for (const { number, text } of numbers) {
    if (numToConvert === number) {
      if (shouldPrefixWithOne(number)) {
        words += 'one ';
      }
      words += text;
      return words;
    }

    if (numToConvert > number) {
      closestSmallerNumber = number;
      closestSmallerNumberText = text;
      break;
    }
  }

  // How many 'closestSmallerNumber's can numToConvert be grouped into?
  // e.g. five 'thousand'.
  prefixNum = Math.floor(numToConvert / closestSmallerNumber);
  if (prefixNum !== 1 || shouldPrefixWithOne(closestSmallerNumber)) {
    words += numToWords(prefixNum, options) + ' ';
  }

  words += closestSmallerNumberText;

  remainder = numToConvert - prefixNum * closestSmallerNumber;
  if (remainder > 0 && shouldHyphenate(closestSmallerNumber)) {
    words += '-';
  } else if ((closestSmallerNumber >= 1000) && (remainder > 0) && (remainder < 100)) {
    words += comma + ' ' + and;
  } else if ((closestSmallerNumber >= 1000) && (remainder > 0)) {
    words += comma + ' ';
  } else if ((closestSmallerNumber === 100) && (remainder > 0)) {
    words += ' ' + and;
  } else {
    words += ' ';
  }

  if (remainder > 0) {
    words += numToWords(remainder, options);
  }

  return words.trim();
};

export default numToWords;
