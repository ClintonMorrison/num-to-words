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
import { shouldPrefixWithOne, shouldHyphenate } from "./util";
import { numberList, numberMap } from './numbers';

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
export function numberToWords(numToConvert) {
    let i;
    let n;
    let words = "";
    let prefixNum;
    let remainder;

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
        words += "negative ";
        numToConvert *= -1;
    }

    // Search list of numbers for closest smaller number.
    // numToConvert will be written in terms of this number.
    for (i = 0; i < numberList.length; i++) {
        n = numberList[i];

        // If an exact match is found, just return that word.
        if (numToConvert === n) {
            if (shouldPrefixWithOne(n)) {
                words += "one ";
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
    if (prefixNum !== 1 || shouldPrefixWithOne(n)) {
        words += numberToWords(prefixNum) + " ";
    }

    // Add word for "n".
    words += numberMap[n];

    // Add hyphen or space to separate parts.
    remainder = numToConvert - prefixNum * n;
    if (remainder > 0 && shouldHyphenate(n)) {
        words += "-";
    } else {
        words += " ";
    }

    // Add word for amount not accounted for yet.
    if (remainder > 0) {
    words += numberToWords(remainder);
    }

    // Remove trailing whitespace.
    return words.trim();
};
