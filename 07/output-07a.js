// Read input file and push it to an array
var fs = require("fs");
var text = fs.readFileSync("./input-07").toString('utf-8');
var array = text.split(",").map(Number);

// Log the input
// console.log("Input array: \n" + array);
// console.log("----------------------------------------------------------");

// Initialize array to hold the possible fuel values
let fuelCost = [];

// Retrive the largest value from the input array
let maxValue = array.reduce(function (a, b) { return Math.max(a, b); }, 0);

// Loop for each potential value (from 0 to the largest value in the input array)
for (i = 1; i <= maxValue; i++) {

    // Initialize fuel consumption
    let fuelConsumption = 0;

    // Calculate fuel consumption across all crabs
    for (j = 0; j < array.length; j++) {
        fuelConsumption += Math.abs(array[j] - i);
    }

    // Push fuel consumption to the fuelCost array
    fuelCost.push(fuelConsumption);

}

// Retrive the smallest value from the fuelCost array to represent the least fuel possible the crabs could use
let minValue = fuelCost.reduce(function (a, b) { return Math.min(a, b); });

// Log part one result
console.log("Part One: " + minValue);