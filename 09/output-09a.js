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

        // Initialize array
        let arr = [];

        // Current value
        let current = rawInputArray[i][j];

        // Value to the left
        if (j > 0){
            let left = rawInputArray[i][j-1];
            arr.push(left);
        }
        
        // Value to the right
        if (j < rawInputArray[i].length){
            let right = rawInputArray[i][j+1];
            arr.push(right);
        }
        
        // Value to the top
        if (i > 0){
            let top = rawInputArray[i-1][j];
            arr.push(top);
        }
        
        // Value to the bottom
        if (i < (rawInputArray.length - 1)){
            let bottom = rawInputArray[i+1][j];
            arr.push(bottom);
        }

        // Remove undefinied values from array
        arr = arr.filter(function(val){ return val!=undefined; });
        
        // Get lowest value from arr
        var min = Math.min.apply(Math, arr);

        // If current is less than the min than add the current value + 1 to the running risk sum
        if (current < min){
            console.log("Current: " + current);
            sumRiskLevel += (current + 1);
        }
    }
}

// Log output
console.log("Part a: \n" + sumRiskLevel);
console.log("----------------------------------------------------------");