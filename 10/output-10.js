// Read input file and push it to an array named inputArray which is mapped appropriately per the problem statement
const fs = require("fs");
const inputArray = fs
    .readFileSync("./input-10 subset").toString('utf-8') // Read input file. Replace 'tpd' with path to .txt file containing raw input
    .split("\n") // Split on new lines
    .filter(Boolean); // Remove empty lines

// Initial log separator
console.log("----------------------------------------------------------");

// Log the raw input
console.log("Input array:");
console.log(inputArray);
console.log("----------------------------------------------------------");

// Part A - Pass in the input array
function partA(inputArray){

    for (let i = 0; i < inputArray.length; i++) {

        const lineLength = inputArray[i].length;

        for (let j = 0; j < lineLength; j++) {

            const element = inputArray[i][j];

            // Determine if line is corrupted
            // Start at the first closing character - create chunk then work outside to create chunks

            // For corrupted lines stop at the first incorrect closing character

            // Track incorrect closing characters

            // Create a total syntax error score
            
        }
    }

    return 'TBD';
}

// Log Part A
console.log("Part a: \n" + partA(inputArray));
console.log("----------------------------------------------------------");

// Part B - Pass in the input array
function partB(inputArray){
    return 'TBD';
}

// Log Part B
// console.log("Part b: \n" + partB(inputArray));
// console.log("----------------------------------------------------------");

//////////////////////// HELPER FUNCTION(S) ////////////////////////
