import { numbersToWords, numberToWords } from "../src/";

describe("numbersToWords", function() {
    const textForNumbers = {
        1: 'one',
        10: 'ten',
        20: 'twenty',
        21: 'twenty-one',
        55: 'fifty-five',
        101: 'one hundred one',
        1234: 'one thousand two hundred thirty-four',
        1000000001: 'one billion one',
        1000000000000025: 'one thousand trillion twenty-five'

    };

    it('outputs the correct text for each number', function () {
        for (const [number, text] of Object.entries(textForNumbers)) {
            numberToWords(number).should.equal(text);
            numberToWords(number * -1).should.equal(`negative ${text}`);

        }
    });
});
