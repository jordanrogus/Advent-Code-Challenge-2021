// Read input file and push it to an array named inputArray which is mapped appropriately per the problem statement
const fs = require("fs");
const inputArray = fs
    .readFileSync("./tbd").toString('utf-8') // Read input file. Replace 'tpd' with path to .txt file containing raw input
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
console.log("Part b: \n" + partB(inputArray));
console.log("----------------------------------------------------------");

//////////////////////// HELPER FUNCTION(S) ////////////////////////
