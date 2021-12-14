// Read input file and push it to an array named inputArray which is mapped appropriately per the problem statement
const fs = require("fs");
const inputArray = fs
    .readFileSync("./input-11").toString('utf-8') // Read input file. Replace 'tpd' with path to .txt file containing raw input
    .split("\n") // Split on new lines
    .map(row => row.split('').map(Number)); // Map input as numbers split by character

// Initial log separator
console.log("----------------------------------------------------------");

// Log the raw input
console.log("Input array at step 0: \n" + inputArray);
console.log("----------------------------------------------------------");

// Determine number of flashes required for every octupus to have flashed
const totalFlashCheck = parseInt(inputArray.length) * parseInt(inputArray[0].length);

// Determine number of steps to model
const step = 1000;

// Part A - Pass in the input array
function partA(inputArray) {

    // Initialize the total flashes
    let totalFlashes = 0;

    // For each step
    for (s = 1; s <= step; s++) {

        // Initialize the flashes per step
        let flashes = 0;

        // Add 1 to each octopus energy level (value) in the array to represent the step occuring
        inputArray = inputArray.map(function (row) {
            return row.map(function (element) {
                return element += 1;
            })
        });

        // For each row
        for (i = 0; i < inputArray.length; i++) {

            // For each character per row
            for (j = 0; j < inputArray[i].length; j++) {

                // Retrive the number of flashes using a recursive function
                flashes = _octoEnergy(i, j, inputArray).flashes;

                // Add the flashes from this step to the running sum
                totalFlashes += flashes;

            }
        }
    }

    // Return the total flashes
    return totalFlashes;
}

// Log Part A
console.log("Part a: \n" + partA(inputArray));
console.log("----------------------------------------------------------");

// Part B - Pass in the input array
function partB(inputArray) {

    // Initialize the total flashes and an array containing the total flashes after each step
    let totalFlashes = 0;
    let flashesAfterStep = [[]];

    // For each step
    for (s = 1; s <= step; s++) {

        // Initialize the flashes per step
        let flashes = 0;

        // Add 1 to each octopus energy level (value) in the array to represent the step occuring
        inputArray = inputArray.map(function (row) {
            return row.map(function (element) {
                return element += 1;
            })
        });

        // For each row
        for (i = 0; i < inputArray.length; i++) {

            // For each character per row
            for (j = 0; j < inputArray[i].length; j++) {

                // Retrive the number of flashes using a recursive function
                flashes = _octoEnergy(i, j, inputArray).flashes;

                // Add the flashes from this step to the running sum
                totalFlashes += flashes;

            }
        }

        // For each step push the step and the count of total flashes after the step
        flashesAfterStep.push([s, totalFlashes]);
    }

    // Clear the 2D array containing the flashes after each step of any empty inner arrays by checking for the step
    // to be populated
    flashesAfterStep = flashesAfterStep.filter(function(item) {
        return item[0];
      });

    // Log the 2D array containing the flashes after each step
    console.log("Total flashes after each step:");
    console.log(flashesAfterStep);
    console.log("----------------------------------------------------------");

    // Loop through array containing flashes after each step - If the difference in flashes is equal to the total
    // number of octopus then we have found the step where they have all flashed
    for (a = 1; a < flashesAfterStep.length; a++) {
        if (a < flashesAfterStep.length - 1) {
            if (flashesAfterStep[a + 1][1] - flashesAfterStep[a][1] == totalFlashCheck) {
                console.log('All flashed at step: ' + flashesAfterStep[a + 1][0]);
                console.log("----------------------------------------------------------");
                return flashesAfterStep[a + 1][0];
            }
        }
    }

    // Return if not enough steps modeled for all of the octopus to flash
    return 'All octopi did not flash in ' + step + ' steps';
}

// Log Part B
console.log("Part b: \n" + partB(inputArray));
console.log("----------------------------------------------------------");

//////////////////////// HELPER FUNCTION(S) ////////////////////////

/**
 * _octoEnergy is a recrusive function to return an object containing the number of flashes and updated 2D array
 * @param row : Row position
 * @param col : Column position
 * @param map : 2D Array
 * @returns obj : Returns an object containing the number of flashes and updated 2D array
 */
function _octoEnergy(row, col, map) {

    // Initialize object which will be returned
    let obj = {
        'flashes': 0,
        'map': map
    }

    // Base Case - If current value < 9 return 0 as no flash occured
    if (map[row][col] <= 9) {
        return obj;
    };

    // Set energy level to 0 as flashed
    map[row][col] = 0;

    // Initialize the flashes to 1 as the current octupus energy level is greater than or equal to 9 thus flashing
    obj.flashes = 1;

    // Increase the energy level of every adjacent octupus by 1 as long as it has not flashed - Recursive call
    // Top
    if (row > 0) {
        if (map[row - 1][col] != 0) {
            map[row - 1][col] = map[row - 1][col] += 1;
            obj.flashes += _octoEnergy(row - 1, col, map).flashes
        }
    }
    // Top-Right
    if (row > 0 && col < (map[row].length - 1)) {
        if (map[row - 1][col + 1] != 0) {
            map[row - 1][col + 1] = map[row - 1][col + 1] += 1;
            obj.flashes += _octoEnergy(row - 1, col + 1, map).flashes
        }
    }
    // Right
    if (col < (map[row].length - 1)) {
        if (map[row][col + 1] != 0) {
            map[row][col + 1] = map[row][col + 1] += 1;
            obj.flashes += _octoEnergy(row, col + 1, map).flashes
        }
    }
    // Bottom-Right
    if (row < (map.length - 1) && col < (map[row].length - 1)) {
        if (map[row + 1][col + 1] != 0) {
            map[row + 1][col + 1] = map[row + 1][col + 1] += 1;
            obj.flashes += _octoEnergy(row + 1, col + 1, map).flashes
        }
    }
    // Bottom
    if (row < (map.length - 1)) {
        if (map[row + 1][col] != 0) {
            map[row + 1][col] = map[row + 1][col] += 1;
            obj.flashes += _octoEnergy(row + 1, col, map).flashes
        }
    }
    // Bottom-Left
    if (row < (map.length - 1) && col > 0) {
        if (map[row + 1][col - 1] != 0) {
            map[row + 1][col - 1] = map[row + 1][col - 1] += 1;
            obj.flashes += _octoEnergy(row + 1, col - 1, map).flashes
        }
    }
    // Left
    if (col > 0) {
        if (map[row][col - 1] != 0) {
            map[row][col - 1] = map[row][col - 1] += 1;
            obj.flashes += _octoEnergy(row, col - 1, map).flashes
        }
    }
    // Top-Left
    if (row > 0 && col > 0) {
        if (map[row - 1][col - 1] != 0) {
            map[row - 1][col - 1] = map[row - 1][col - 1] += 1;
            obj.flashes += _octoEnergy(row - 1, col - 1, map).flashes
        }
    }

    // Update the 2D array to the latest
    obj.map = map;

    // Returns object containing the number of flashes and the updated 2D array
    return obj;
}