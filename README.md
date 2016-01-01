# numberToWordsJS
## What is this? 
This is library provides a method for converting arbitrary integers into english text.
For example, it would convert the number "123456" to "one hundred twenty-three thousand four hundred fifty-six"

All positive and negative integers are supported. Floating point numbers are rounded to integers
before being converted to words.

##How to use
Including this file in your project automatically adds a single function
numberToWords" to the global window object. The function can be called
directly, taking a number as a parameter.

##Examples
```javascript
numberToWords(0);      // returns "zero"
numberToWords(10001);  // returns "ten thousand one"
numberToWords(111);    // returns "one hundred eleven"
numberToWords(-77);    // returns "negative seventy-seven"
```
