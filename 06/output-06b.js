// Read input file and push it to an array
var fs = require("fs");
var text = fs.readFileSync("./input-06 subset").toString('utf-8');
var lanternfishAgesArrayInput = text.split(",").map(Number);

// Initialize array to keep track of updated lanternfish ages. Initiailize to the input for day = 0
let currentLanternfishAgesArray = lanternfishAgesArrayInput;
console.log("Day 0: \n" + lanternfishAgesArrayInput);
console.log("----------------------------------------------------------"); 

// Create const to determine the number of days to model
const days = 80;

// Loop each day
for (i = 1; i <= days; i++) {

    // Initialize the count of new lantern fish
    let countNewLanternFish = 0;

    // Calculations are the same per number so look into bucketing so calculations are only happening once per bucket
    

    /*
    console.log("Day " + i + ": \n" + currentLanternfishAgesArray);
    console.log("----------------------------------------------------------"); 
    */
}

console.log("Count of Lantern Fish: " + currentLanternfishAgesArray.length);