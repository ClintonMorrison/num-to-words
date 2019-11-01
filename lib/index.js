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
function numToWords(numToConvert) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var andForBritish = options.ands || false;

  var comma = options.commas ? ',' : '';
  var and = andForBritish ? _numbers.andWord + ' ' : '';
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
    words += numToWords(prefixNum, options) + ' ';
  }

  words += closestSmallerNumberText;

  remainder = numToConvert - prefixNum * closestSmallerNumber;
  if (remainder > 0 && (0, _util.shouldHyphenate)(closestSmallerNumber)) {
    words += '-';
  } else if (closestSmallerNumber >= 1000 && remainder > 0 && remainder < 100) {
    words += comma + ' ' + and;
  } else if (closestSmallerNumber >= 1000 && remainder > 0) {
    words += comma + ' ';
  } else if (closestSmallerNumber === 100 && remainder > 0) {
    words += ' ' + and;
  } else {
    words += ' ';
  }

  if (remainder > 0) {
    words += numToWords(remainder, options);
  }

  return words.trim();
};

exports.default = numToWords;