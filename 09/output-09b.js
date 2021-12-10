// Read input file and push it to an array
var fs = require("fs");
var text = fs.readFileSync("./input-09").toString('utf-8');
var rawInputArray = text.split("\n").map(row => row.split('').map(Number));

// Log the raw input
/*
console.log("Raw input array:");
console.log(rawInputArray);
console.log("----------------------------------------------------------");
*/

// Initialize result
let sumRiskLevel = 0;

// For each row
for (i = 0; i < rawInputArray.length; i++){

    // For each character per row
    for (j = 0; j < rawInputArray[i].length; j++){

        // Initialize array of basin sizes and count to capture basin size
        let arr = [];
        let count = 0;

        // Current value
        let current = rawInputArray[i][j];

        if (current != 9){

            // Part of basin - Get the count of numbers around the value not contained by '9's'
        }
    }
}

// Log output
console.log("Part b: \n" + sumRiskLevel);
console.log("----------------------------------------------------------");