/**
 * This is library provides a method for converting arbitrary integers into english text.
 * For example, it would convert the number "123456" to "one hundred twenty-three thousand four hundred fifty-six"
 *
 * All positive and negative integers are supported. Floating point numbers are rounded to integers
 * before being converted to words.
 *
 * How to use:
 *    Including this file in your project automatically adds a single function
 *    "numberToWords" to the global window object. The function can be called
 *    directly, taking a number as a parameter.
 *
 * Examples:
 *   numberToWords(0);      // returns "zero"
 *   numberToWords(10001);  // returns "ten thousand one"
 *   numberToWords(111);    // returns "one hundred eleven"
 *   numberToWords(-77);    // returns "negative seventy-seven"
 *
 * @author Clinton Morrison <contact@clintonmorrison.com>
 *
 *
 * @license
 * Copyright (c) 2016 Clinton Morrison.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function () {

    // Polyfill for String.prototype.trim()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
      String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      };
    }

    /**
     * Object of form number => word
     *
     * @type {object}
     */
    var numberMap = {
        0: 'zero',
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        11: 'eleven',
        12: 'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        16: 'sixteen',
        17: 'seventeen',
        18: 'eighteen',
        19: 'nineteen',
        20: 'twenty',
        30: 'thirty',
        40: 'forty',
        50: 'fifty',
        60: 'sixty',
        70: 'seventy',
        80: 'eighty',
        90: 'ninety',
        100: 'hundred',
        1000: 'thousand',
        1000000: 'million',
        1000000000: 'billion',
        1000000000000: 'trillion'
    };

    /**
     * A list of numbers contained in numberMap in descending order.
     *
     * This is helpful because the order of object keys (ie on the numberMap object)
     * is not guaranteed to be preserved when iterating over the keys.
     *
     * @type {array}
     */
    var numberList = [
        1000000000000,
        1000000000,
        1000000,
        1000,
        100,
        90,
        80,
        70,
        60,
        50,
        40,
        30,
        20,
        19,
        18,
        17,
        16,
        15,
        14,
        13,
        12,
        11,
        10,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1,
        0
    ];

    /**
     * Checks if a certain number should be prefixed by a one.
     * i.e. "100" should be written as "one hundred" while
     *      "10" should not be written as "one ten".
     *
     * Examples:
     * _shouldPrefixWithOne(10); // returns False
     * _shouldPrefixWithOne(100); // returns True
     *
     * @param {number] n placeholder to check
     * @returns {boolean}
     */
    var _shouldPrefixWithOne = function (n) {
        return n >= 100;
    };

    /**
     * Checks if a certain number should be joined with hyphens
     * e.g. "ninety-nine" versus "one hundred one"
     *
     * Examples:
     * _shouldHyphenate(10); // returns False
     * _shouldHyphenate(21); // returns True
     *
     * @param {number] n placeholder to check
     * @returns {boolean}
     */
    var _shouldHyphenate = function (n) {
        return n >= 20 && n <= 99;
    };

    /**
     * Converts a number into the corresponding series of english words
     *
     * Examples:
     *    numberToWords(0);      // returns "zero"
     *    numberToWords(10001);  // returns "ten thousand one"
     *    numberToWords(111);    // returns "one hundred eleven"
     *
     * @param {number} numToConvert
     * @returns {string}
     */
    window.numberToWords = function (numToConvert) {
        var i, n, words = "", prefixNum,  remainder;

        // Make sure number is an integer.
        numToConvert = parseInt(numToConvert, 10);

        if (isNaN(numToConvert)) {
            return "not a number";
        }

        if (!isFinite(numToConvert)) {
            return "infinity";
        }

        // Prefix negative numbers with 'negative'.
        if (numToConvert < 0) {
            words += 'negative ';
            numToConvert *= -1;
        }

        // Search list of numbers for closest smaller number.
        // numToConvert will be written in terms of this number.
        for (i = 0; i < numberList.length; i++) {
            n = numberList[i];

            // If an exact match is found, just return that word.
            if (numToConvert === n) {
                if (_shouldPrefixWithOne(n)) {
                    words += 'one ';
                }
                words += numberMap[n];
                return words;
            }

            // A smaller number was found.
            if (numToConvert > n) {
                break;
            }
        }

        // How many "n"s can numToConvert be grouped into?
        // e.g. five "thousand".
        prefixNum = Math.floor(numToConvert / n);
        if (prefixNum !== 1 || _shouldPrefixWithOne(n)) {
            words += numberToWords(prefixNum) + ' ';
        }

        // Add word for "n".
        words += numberMap[n];

        // Add hyphen or space to separate parts.
        remainder = numToConvert - (prefixNum * n);
        if (remainder > 0 && _shouldHyphenate(n)) {
            words += '-';
        } else {
            words += ' ';
        }

        // Add word for amount not accounted for yet.
        if (remainder > 0) {
            words += numberToWords(remainder);
        }

        // Remove trailing whitespace.
        return words.trim();
    };

})();