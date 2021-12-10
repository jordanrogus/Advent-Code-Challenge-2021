// Read input file and push it to an array
var fs = require("fs");
var text = fs.readFileSync("./input-08").toString('utf-8');
var rawInputArray = text.split("\n");

// Clean up input and push to an array
const inputArray = text.split('\n')
    .map(row => row.split(' | '))
    .map(row => [row[0].split(' '), row[1].split(' ')]);

// Initialize result
let result = 0;

// Loop through each line
for (i = 0; i < inputArray.length; i++) {

    // Initialize the pattern for all digits and fill in those which are based solely on unique length
    let inputDigit0Pattern = "";
    let inputDigit1Pattern = inputArray[i][0].filter(string => string.length == 2).toString();
    let inputDigit2Pattern = "";
    let inputDigit3Pattern = "";
    let inputDigit4Pattern = inputArray[i][0].filter(string => string.length == 4).toString();
    let inputDigit5Pattern = "";
    let inputDigit6Pattern = "";
    let inputDigit7Pattern = inputArray[i][0].filter(string => string.length == 3).toString();
    let inputDigit8Pattern = inputArray[i][0].filter(string => string.length == 7).toString();
    let inputDigit9Pattern = "";

    // Get the pattern for digit 3
    // Only pattern w/ length of 5 that contains both characters from inputDigit1Pattern
    let inputSegment5CharsArray = inputArray[i][0].filter(string => string.length == 5);
    for (j = 0; j < inputSegment5CharsArray.length; j++) {

        if(_includesAll(inputSegment5CharsArray[j], inputDigit1Pattern.split(''))){
            inputDigit3Pattern = inputSegment5CharsArray[j].toString();
        }

    }

    // Get middle and top left char
    let topLeftChar = inputDigit4Pattern;
    let middle = "";
    for (z = 0; z < inputDigit7Pattern.length; z++){
        topLeftChar = topLeftChar.replace(inputDigit7Pattern.charAt(z), "");
    }
    let temp = topLeftChar;
    middle = _anythingInCommon(topLeftChar, inputDigit3Pattern);
    topLeftChar = temp.replace(middle, "");

    // Get the pattern for digits 2 and 5
    for (j = 0; j < inputSegment5CharsArray.length; j++) {

        // Get the pattern for digit 5
        // includes topleft
        if (inputSegment5CharsArray[j].indexOf(topLeftChar) != -1){
            inputDigit5Pattern = inputSegment5CharsArray[j].toString();
        } else if (_includesAll(inputSegment5CharsArray[j], inputDigit1Pattern.split(''))){

            // do nothing

        // Get the pattern for digit 2
        } else {
            inputDigit2Pattern = inputSegment5CharsArray[j].toString();
        }
    }
    
    let inputSegment6CharsArray = inputArray[i][0].filter(string => string.length == 6);
    for (k = 0; k < inputSegment6CharsArray.length; k++) {

        // Get the pattern for digit 6
        // Only pattern w/ length of 6 that contains only one character from inputDigit1Pattern
        if(_includesOnlyOne(inputSegment6CharsArray[k], inputDigit1Pattern.split(''))){
            inputDigit6Pattern = inputSegment6CharsArray[k].toString();
        // includes topleft for digit 9
        } else if (inputSegment6CharsArray[k].indexOf(middle) != -1){
            inputDigit9Pattern = inputSegment6CharsArray[k].toString();
        // remainder is digit 0
        } else {
            inputDigit0Pattern = inputSegment6CharsArray[k].toString();
        }
    }

    //inputArray[0] = input
    let inputDigitPatternMapping = {
        0: inputDigit0Pattern,
        1: inputDigit1Pattern,
        2: inputDigit2Pattern,
        3: inputDigit3Pattern,
        4: inputDigit4Pattern,
        5: inputDigit5Pattern,
        6: inputDigit6Pattern,
        7: inputDigit7Pattern,
        8: inputDigit8Pattern,
        9: inputDigit9Pattern,
    }

    console.log("Input array, input only for line: " + i);
    console.log(inputArray[i][0]);
    console.log("Input Digit Pattern Mapping");
    console.log(inputDigitPatternMapping);
    console.log("----------------------------------------------------------");

    console.log("Input array, output only for line: " + i);
    console.log(inputArray[i][1]);
    console.log("----------------------------------------------------------");

    //inputArray[1] = output
    //[1] for each output need to determine its digit... by magic
    let value = "";
    for (l = 0; l < inputArray[i][1].length; l++){

        let currentOutputSegment = inputArray[i][1][l];
        let digit = 0;

        if (currentOutputSegment.length == 2){
            digit = 1;
        } else if (currentOutputSegment.length == 4){
            digit = 4;
        } else if (currentOutputSegment.length == 3){
            digit = 7;
        } else if (currentOutputSegment.length == 7){
            digit = 8;

        // length of 5
        } else if (currentOutputSegment.length == 5){

            // _includesAll(inputSegment5CharsArray[j], inputDigit1Pattern.split(''))

            // 2
            if (_includesAll(inputDigitPatternMapping[2], currentOutputSegment.split(''))){
                digit = 2;
            }

            // 3
            if (_includesAll(inputDigitPatternMapping[3], currentOutputSegment.split(''))){
                digit = 3;
            }

            //5
            if (_includesAll(inputDigitPatternMapping[5], currentOutputSegment.split(''))){
                digit = 5;
            }

        // length of 6
        } else if (currentOutputSegment.length == 6){

            // 0
            if (_includesAll(inputDigitPatternMapping[0], currentOutputSegment.split(''))){
                digit = 0;
            }

            // 6
            if (_includesAll(inputDigitPatternMapping[6], currentOutputSegment.split(''))){
                digit = 6;
            }

            //9
            if (_includesAll(inputDigitPatternMapping[9], currentOutputSegment.split(''))){
                digit = 9;
            }

        } 
        


        value += digit.toString();
        console.log('For output: ' + inputArray[i][1][l] + ', digit: ' + digit);
    }

    console.log("Value: " + parseInt(value));
    result += parseInt(value);
}

// Part b result
console.log('Part b:', result);

//////////////////////// HELPER FUNCTIONS ////////////////////////

/**
 * @param str : string
 * @param chars : array of characters
 * @returns boolean
 */

function _includesAll(str, chars) {
    for (const char of chars) {
        if (!str.includes(char)) return false;
    }
    return true;
}

/**
 * @param str : string
 * @param chars : array of characters
 * @returns boolean
 */
function _includesOnlyOne(str, chars) {
    let count = 0;

    for (const char of chars) {
        if (str.includes(char)){
            count++;
        } 
    }

    if (count == 1){
        return true;
    } else {
        return false;
    }
}

/**
 * @param a : string
 * @param b : string
 * @returns character in common
 */
function _anythingInCommon(a, b){
    if( b.length < a.length )
        return anythingInCommon(b, a)

    for( var i = 0, len = a.length; i < len; i++ ) 
        if(b.indexOf(a[i]) != -1)
            return b.charAt(b.indexOf(a[i]));
  
    return false;
}