// Read input file and push it to an array named inputArray
const fs = require("fs");
const inputArray = fs
    .readFileSync("./input-09").toString('utf-8') // Read input file
    .split("\n") // Split on new lines
    .map(row => row.split('').map(Number)); // Map input as numbers split by character

// Initial log separator
console.log("----------------------------------------------------------");

// Log the raw input
// console.log("Input array:");
// console.log(inputArray);
// console.log("----------------------------------------------------------");

// Part A - Pass in the input array
function partA(inputArray) {

    // Initialize result
    let sumRiskLevel = 0;

    // For each row
    for (i = 0; i < inputArray.length; i++) {

        // For each character per row
        for (j = 0; j < inputArray[i].length; j++) {

            // Initialize array
            let arr = [];

            // Current value
            let current = inputArray[i][j];

            // Value to the left
            if (j > 0) {
                let left = inputArray[i][j - 1];
                arr.push(left);
            }

            // Value to the right
            if (j < inputArray[i].length) {
                let right = inputArray[i][j + 1];
                arr.push(right);
            }

            // Value to the top
            if (i > 0) {
                let top = inputArray[i - 1][j];
                arr.push(top);
            }

            // Value to the bottom
            if (i < (inputArray.length - 1)) {
                let bottom = inputArray[i + 1][j];
                arr.push(bottom);
            }

            // Remove undefinied values from array
            arr = arr.filter(function (val) { return val != undefined; });

            // Get lowest value from arr
            var min = Math.min.apply(Math, arr);

            // If current is less than the min than add the current value + 1 to the running risk sum
            if (current < min) {
                sumRiskLevel += (current + 1);
            }
        }
    }
    // Return result
    return sumRiskLevel;
}

// Log Part A
console.log("Part a: \n" + partA(inputArray));
console.log("----------------------------------------------------------");

// Part B
function partB(inputArray) {

    // Map array to 1s and 0s where 1s represent the high points (9s) and 0s represent everything else
    // Called map as it is a 2D array
    let binaryMap = new Array(inputArray.length)
        .fill(0)
        .map( (element, row) => Array(inputArray[0].length)
            .fill(0)
            .map( (element, column) => inputArray[row][column] === 9 ? 1 : 0)
        );

    // Initialize array to contain the basin sizes
    let basinSizeArray = [];

    // Flood Fill
    // For each row
    for (i = 0; i < inputArray.length; i++) {
        // For each element per row
        for (j = 0; j < inputArray[i].length; j++) {
            // If the element is not a high point (1) run the algorithm
            if (inputArray[i][j] != 1){
                let size = _floodFillAlgo(i, j, binaryMap); // Size is the sum of the basin using a recursive function
                // Push size to array if it is larger than 0
                if (size > 0){
                    basinSizeArray.push(size);
                }
            }
        }
    }

    // Sort array from largest to smallest basin size
    basinSizeArray = basinSizeArray.sort(function(a,b){ return b-a });

    // Retrieve the product of the highest 3 values of the array
    return basinSizeArray[0] * basinSizeArray[1] * basinSizeArray[2];
}

// Log Part B
console.log("Part b: \n" + partB(inputArray));
console.log("----------------------------------------------------------");

//////////////////////// HELPER FUNCTION(S) ////////////////////////

/**
 * floodFillAlgo is a recursive function following the flood fill algorithm. The term node is used to represent an individual
 * element in the 2D array
 * @param row : Row position
 * @param col : Column position
 * @param map : 2D Binary Array
 * @returns size : Returns an integer denoting the size of the basin
 */
function _floodFillAlgo(row, col, map){

    // If the node has been visited or is a high point (=1), then return size = 0
    // This is the base case 
    if (map[row][col] == 1) return 0;

    // Set node as visited by replacing the 0 with a 1
    map[row][col] = 1;

    // Initialize the basin size to 1 (as the current node is not a 1)
    let basinSize = 1;

    // If their is a node to the left of the passed in node
    if (col > 0) {
        basinSize += _floodFillAlgo(row,col - 1,map)
    }

    // If their is a node to the right of the passed in node
    if (col < (map[row].length - 1)) {
        basinSize += _floodFillAlgo(row,col + 1,map)
    }

    // If their is a node to the top of the passed in node
    if (row > 0) {
        basinSize += _floodFillAlgo(row - 1,col,map)
    }

    // If their is a node below the passed in node
    if (row < (map.length - 1)) {
        basinSize += _floodFillAlgo(row + 1,col,map)
    }

    // Returns the basin size
    return basinSize;
}