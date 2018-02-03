# numberToWordsJS
## What is this? 
This is library provides a method for converting arbitrary integers into english text.
For example:
```
    -1    ->    "negative one"
     4    ->    "four"
123456    ->    "one hundred twenty-three thousand four hundred fifty-six"
```

All positive and negative integers are supported. Floating point numbers are rounded to integers
before being converted to words.

## How to use
To use this library you need to import the library in your project. For example:
```javascript
// es6
import numberToWords from 'number-to-words';

// require
const numberToWords = require('number-to-words');
```

The function takes a number as a parameter and returns a string of words.

## Examples
```javascript
numberToWords(0);      // returns "zero"
numberToWords(10001);  // returns "ten thousand one"
numberToWords(111);    // returns "one hundred eleven"
numberToWords(-77);    // returns "negative seventy-seven"
```
