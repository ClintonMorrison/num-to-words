/**
 * This is library provides a method for converting arbitrary integers into english text.
 * For example, it would convert the number "123456" to "one hundred twenty-three thousand four hundred fifty-six"
 *
 * All positive and negative integers are supported. Floating point numbers are rounded to integers
 * before being converted to words.
 *
 * 
 * Examples:
 *   numberToWords(0);      // returns "zero"
 *   numberToWords(10001);  // returns "ten thousand one"
 *   numberToWords(111);    // returns "one hundred eleven"
 *   numberToWords(-77);    // returns "negative seventy-seven"
 *
 * @author Clinton Morrison <contact@clintonmorrison.com>
 */

(function () {
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