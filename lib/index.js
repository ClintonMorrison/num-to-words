'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numToWords = numToWords;

var _util = require('./util');

var _numbers = require('./numbers');

/**
 * Converts a number into the corresponding series of english words
 *
 * Examples:
 *  numToWords(0);    // returns 'zero'
 *  numToWords(10001);  // returns 'ten thousand one'
 *  numToWords(111);  // returns 'one hundred eleven'
 *
 * @param {number} numToConvert
 * @returns {string}
 */
/**
 * This is library provides a method for converting arbitrary integers into english text.
 * For example, it would convert the number '123456' to 'one hundred twenty-three thousand four hundred fifty-six'
 *
 * All positive and negative integers are supported. Floating point numbers are rounded to integers
 * before being converted to words.
 *
 *
 * Examples:
 *   numToWords(0);    // returns 'zero'
 *   numToWords(10001);  // returns 'ten thousand one'
 *   numToWords(111);  // returns 'one hundred eleven'
 *   numToWords(-77);  // returns 'negative seventy-seven'
 *
 * @author Clinton Morrison <contact@clintonmorrison.com>
 */
function numToWords(numToConvert) {
  var words = '';
  var prefixNum = void 0;
  var remainder = void 0;
  var closestSmallerNumber = void 0;
  var closestSmallerNumberText = void 0;

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
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _numbers.numbers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value,
          number = _step$value.number,
          text = _step$value.text;

      if (numToConvert === number) {
        if ((0, _util.shouldPrefixWithOne)(number)) {
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
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  prefixNum = Math.floor(numToConvert / closestSmallerNumber);
  if (prefixNum !== 1 || (0, _util.shouldPrefixWithOne)(closestSmallerNumber)) {
    words += numToWords(prefixNum) + ' ';
  }

  words += closestSmallerNumberText;

  remainder = numToConvert - prefixNum * closestSmallerNumber;
  if (remainder > 0 && (0, _util.shouldHyphenate)(closestSmallerNumber)) {
    words += '-';
  } else {
    words += ' ';
  }

  if (remainder > 0) {
    words += numToWords(remainder);
  }

  return words.trim();
};

exports.default = numToWords;