# numToWords
## What is this? 
This library provides a method for converting arbitrary integers into English text. 

For example:
```
    -1    ->    "negative one"
     4    ->    "four"
123456    ->    "one hundred twenty-three thousand four hundred fifty-six"
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
numToWords(10001);  // returns "ten thousand one"
numToWords(111);    // returns "one hundred eleven"
numToWords(-77);    // returns "negative seventy-seven"
```

## Additional Options
For British English a "commas" and "ands" parameters are supported. See https://www.mathsisfun.com/numbers/counting-names-1000.html

```
//"ten thousand and one"
numToWords(10001, { ands: true, commas: true });

// "one hundred and eleven"
numToWords(111, { ands: true, commas: true });

// "one billion, and one"
numToWords(1000000001, { ands: true, commas: true }); 

// "one billion, one"
numToWords(1000000001, { ands: true }); 

// "one billion one"
numToWords(1000000001); 
```


## Development
This project uses es6 and babel. You can build the project with: `npm run build`

You can run the tests with: `npm run test`

## Roadmap
While this library works, and is stable, it could use more features! It could potentially someday support:
- writing numbers in other languages 
- writing numbers as ordinals (e.g. "3rd" or "21st")
- writing decimal numbers or fractions

Instead of "commas" and "ands" options it would ideally support passing a locale.
