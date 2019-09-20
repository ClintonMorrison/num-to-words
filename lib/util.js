"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldPrefixWithOne = shouldPrefixWithOne;
exports.shouldHyphenate = shouldHyphenate;
/**
 * Checks if a certain number should be prefixed by a one.
 * i.e. "100" should be written as "one hundred" while
 *      "10" should not be written as "one ten".
 *
 * Examples:
 * _shouldPrefixWithOne(10); // returns False
 * _shouldPrefixWithOne(100); // returns True
 *
 * @param {number} n placeholder to check
 * @returns {boolean}
 */
function shouldPrefixWithOne(n) {
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
 * @param {number} n placeholder to check
 * @returns {boolean}
 */
function shouldHyphenate(n) {
  return n >= 20 && n <= 99;
};