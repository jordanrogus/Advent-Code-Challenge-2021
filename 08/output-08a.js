// Read input file and push it to an array
var fs = require("fs");
var text = fs.readFileSync("./input-08").toString('utf-8');

////////////////////////////////////// ORIGINAL SOLUTION //////////////////////////////////////
/*
var rawInputArray = text.split("\n");

// Log the raw input
// console.log("Raw input array: \n" + rawInputArray);
// console.log("----------------------------------------------------------");

// Create an array of only the outputs (characters after |)
var outputsOnlyArray = rawInputArray.map(function (string) {
    return string.split("|")[1].trim();
});

// Log the output only array
// console.log("Output only array: \n" + outputsOnlyArray);
// console.log("----------------------------------------------------------");

// Create object to hold a dictionary for the seven-segment display
let sevenSegementDictionary = {
    "zero": {
        "segments": "abcefg"
    },
    "one": {
        "segments": "cf"
    },
    "two": {
        "segments": "acdeg"
    },
    "three": {
        "segments": "acdfg"
    },
    "four": {
        "segments": "bcdf"
    },
    "five": {
        "segments": "abdfg"
    },
    "six": {
        "segments": "abdefg"
    },
    "seven": {
        "segments": "acf"
    },
    "eight": {
        "segments": "abcdefg"
    },
    "nine": {
        "segments": "abcdfg"
    },
};

// Create object to hold a dictionary for the segments
let segmentDictionary = {
    "a": {
        "count": 4
    },
    "b": {
        "count": 2
    },
    "c": {
        "count": 2
    },
    "d": {
        "count": 4
    },
    "e": {
        "count": 2
    },
    "f": {
        "count": 2
    },
    "g": {
        "count": 4
    },
}

// Create an array of arrays of only the outputs (characters after |) split by space
var outputsOnlySplitArray = outputsOnlyArray.map(function (string) {
    return string.split(" ");
});

// Log an example of the array of arrays of only the outputs (characters after |) split by space
// console.log("Output only split array example: \n" + outputsOnlySplitArray[0]);
// console.log("----------------------------------------------------------");

// Retrieve the digits of segmenets with a unique number of characters and add to an array
let digits = [];

// Loop through sevenSegementDictionary object
for (let key in sevenSegementDictionary) {

    // For each ket get the segmeents property length and store in the value variable
    let value = sevenSegementDictionary[key].segments.length;

    // Push value into digits array
    digits.push(value);

}

// Further filter the digits array to only keep values which are non-repeating
digits = digits.filter(x => digits.indexOf(x) === digits.lastIndexOf(x));

// Log digits array
// console.log("Digits: \n" + digits);
// console.log("----------------------------------------------------------");

let instanceCount = 0;

// Loop through each line of the input array
for (i = 0; i < outputsOnlySplitArray.length; i++) {

    // Loop through each line's array split by the space character
    for (j = 0; j < outputsOnlySplitArray[i].length; j++) {

        // Loop through every value in the digits array
        for (k = 0; k < digits.length; k++) {

            // If the element is the same length of the digits array add one to the instance count
            if (outputsOnlySplitArray[i][j].toString().length == digits[k]) {
                instanceCount++
            }
        }

    }

}

// Log output
// console.log("Part a: \n" + instanceCount);
// console.log("----------------------------------------------------------");
*/

////////////////////////////////////// CLEANER SOLUTION //////////////////////////////////////

// Create an input array which is a multi-dimensional array
const inputArray = text.split('\n')
                     .map(row => row.split(' | '))
                     .map(row => [row[0].split(' '), row[1].split(' ')]);


// Log for testing
console.log("Input array cleaned up:");
console.log(inputArray);
console.log("----------------------------------------------------------");

// Use .reduct to add on itself while starting at 0. accu = accumulation, row = each line of the input as two array split by "|", row[1] is only the outputs which is now an array
// Checking lenghts less than 4 or 7 because the digits we care about are {1,4,7,8} which respectivelly require this number of segments {2,4,3,7}
// Looking at the other digits they all require more than 4 segments so we can check for these digits with <= 4 or 7
const result = inputArray.reduce((accu, row) => accu + row[1].filter(string => string.length <= 4 || string.length === 7).length, 0);

// Part a result
console.log('Part a:', result);
