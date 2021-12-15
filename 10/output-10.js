// Read input file and push it to an array named inputArray which is mapped appropriately per the problem statement
const fs = require("fs");
const inputArray = fs
    .readFileSync("./input-10").toString('utf-8') // Read input file. Replace 'tpd' with path to .txt file containing raw input
    .split("\n") // Split on new lines

// Initial log separator
console.log("----------------------------------------------------------");

// Log the raw input
/*
console.log("Input array:");
console.log(inputArray);
console.log("----------------------------------------------------------");
*/

// Initialize Constants
const charMap = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
}

const syntaxErrorLookupObj = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
};

const syntaxCompletionLookupObj = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
};

// Part A - Pass in the input array
function partA(inputArray) {

    // Initialize value for capturing the results
    let syntaxErrorScore = 0;

    // Use stack
    //stack.pop() removes a value
    //stack.push() adds a value

    // Loop through each line
    for (line of inputArray) {

        // Initialize stack
        let stack = [];

        // Loop through each character
        for (let i = 0; i < line.length; i++) {

            // If the character is a starting character -> ( [ { <
            // [] represents a character set of any starting character 
            // Note: need to escape [ with \[

            // If starting character
            if (/[({\[<]/.test(line[i])) {

                // Push the associated closing character to the stack from the charMap object
                stack.push(charMap[line[i]]);

                // If ending character
            } else {

                // Remove associated closing character
                let closingChar = stack.pop();

                // Corrupted line as the latest closing char popped (from the stack) which is the paired starting char
                // is not the same as the current element which is a closing character. Thus some other closing char
                // should be what popped
                if (closingChar != line[i]) {

                    // Add corrupted character value based on the object constant to running syntax error score
                    syntaxErrorScore += syntaxErrorLookupObj[line[i]];

                    // Log the corrupted stacks per line
                    /*
                    console.log("Corrupted Line: " + line);
                    console.log("Corrupted Char: " + line[i]);
                    console.log("Running syntax error score: " + syntaxErrorScore);
                    console.log("----------------------------------------------------------");
                    */
                }
            }
        }
        // Log the stack per line
        /*
        console.log("Line: " + line);
        console.log("Stack: " + stack);
        console.log("----------------------------------------------------------");
        */
    }

    // Return result
    return syntaxErrorScore;
}

// Log Part A
console.log("Part a: \n" + partA(inputArray));
console.log("----------------------------------------------------------");

// Part B - Pass in the input array
function partB(inputArray) {

    // Initialize values for capturing the results
    let syntaxCompletionScore = 0;
    let syntaxCompletionScoreArray = [];

    // Loop through each line
    for (line of inputArray) {

        // Initialize stack
        let stack = [];

        // Loop through each character
        for (let i = 0; i < line.length; i++) {

            // If the character is a starting character -> ( [ { <
            // [] represents a character set of any starting character 
            // Note: need to escape [ with \[

            // If starting character
            if (/[({\[<]/.test(line[i])) {

                // Push the associated closing character to the stack from the charMap object
                stack.push(charMap[line[i]]);

                // If ending character
            } else {

                // Remove associated closing character
                let closingChar = stack.pop();

                // Corrupted line as the latest closing char popped (from the stack) which is the paired starting char
                // is not the same as the current element which is a closing character. Thus some other closing char
                // should be what popped
                if (closingChar != line[i]) {

                    // As the line is corrupted force the stack to empty and break out of the loop immediately
                    stack = [];
                    break;
                }
            }
        }

        // If the stack has values then it is not corrupted- just incomplete
        if (stack.length > 0) {

            // Reverse stack so it is appropriately oriented to fill in the remainder of the string
            stack = stack.reverse();

            // For each char in the stack calculate the completion score via problem statement ruleset
            for (let j = 0; j < stack.length; j++) {
                syntaxCompletionScore = (syntaxCompletionScore * 5) + syntaxCompletionLookupObj[stack[j]];
            }

            // Push score to an array
            syntaxCompletionScoreArray.push(syntaxCompletionScore);

            // Reset the score
            syntaxCompletionScore = 0;

            // Log the incomplete stacks per line with their scores
            /*
            console.log("Incomplete Line: " + line);
            console.log("Incomplete Line Stack: " + stack.join(''));
            console.log("Incomplete Line Stack Score: " + syntaxCompletionScore);
            console.log("----------------------------------------------------------");
            */
        }
    }

    // Log the array of scores per line
    /*
    console.log("Incomplete Line Stack Score Array: " + syntaxCompletionScoreArray);
    console.log("----------------------------------------------------------");
    */

    // Return result
    return _medianOfArr(syntaxCompletionScoreArray);
}

// Log Part B
console.log("Part b: \n" + partB(inputArray));
console.log("----------------------------------------------------------");

//////////////////////// HELPER FUNCTION(S) ////////////////////////

/**
 * _medianOfArr takes in an array and returns its median
 * @param arr : Passed in array of integers
 * @returns int : Returns the integer representing the median of the passed in array
 */
function _medianOfArr(arr) {

    // Retrieve passed in array
    var concat = arr;

    // Sort array
    concat = concat.sort(
        function (a, b) { return a - b });

    // Get length
    var length = concat.length;

    // If length is odd
    if (length % 2 == 1) {
        return concat[(length / 2) - .5];
    }

    // If length is even
    else {
        return (concat[length / 2] + concat[(length / 2) - 1]) / 2;
    }
}