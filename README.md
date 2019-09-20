# numToWords
## What is this? 
This library provides a method for converting arbitrary integers into english/british text. It's a fork from ClintonMorrison to implement the british notation with "and"
For example:
```
    -1    ->    "negative one"
     4    ->    "four"
123456    ->    "one hundred and twenty-three thousand, four hundred and fifty-six"
```

All positive and negative integers are supported. Floating point numbers are rounded to integers
before being converted to words.

## How to use
Install this package on npm with:
```
npm install num-to-words
```


To use this library you need to import the library in your project. For example:
```javascript
// es6
import numToWords from 'num-to-words';

// require
const numToWords = require('num-to-words');
```

The function takes a number as a parameter and returns a string of words.

## Examples
```javascript
numToWords(0);      // returns "zero"
numToWords(10001, true, true);  // returns "ten thousand and one"
numToWords(111, true, true);    // returns "one hundred and eleven"
numToWords(-77);    // returns "negative seventy-seven"
```


## Development
This project uses es6 and babel. You can build the project with: `npm run build`

You can run the tests with: `npm run test`

