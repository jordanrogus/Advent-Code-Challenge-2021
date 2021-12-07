// Read input file and push it to an array
var fs = require("fs");
var text = fs.readFileSync("./input-06").toString('utf-8');
var lanternfishAgesArrayInput = text.split(",").map(Number);

// Log Input
console.log("Raw Input: \n" + lanternfishAgesArrayInput);
console.log("----------------------------------------------------------"); 

// Initialize array to represent the count of fishes by the days
let currentLanternfishAgesArray = new Array(9).fill(0);

// Loop through each input value and for each go to the currentLanternfishAgesArray index of the input value and add one
// This results in a 9 element array that holds the count of instances of that input in the corresponding array index
lanternfishAgesArrayInput.forEach(num => currentLanternfishAgesArray[Number(num)]++);

// Log Day 0
console.log("Day 0: \n" + currentLanternfishAgesArray);
console.log("----------------------------------------------------------"); 

// Create const to determine the number of days to model
const days = 256;

// Loop each day
for (i = 1; i <= days; i++) {

    // Shift the array which represents the fish ages accounting for the new day. Those lost are the fish that will have their timer reset
    var countTimer0 = currentLanternfishAgesArray.shift();

    // The count of fish with their timer reset needs to be added back into the array as their internal timers reset to 6
    currentLanternfishAgesArray[6] = countTimer0 + currentLanternfishAgesArray[6];

    // The count of fish with their timer reset needs to create a duplicate count of fish with internal timers set to 8
    currentLanternfishAgesArray[8] = countTimer0;

    // Log daily results
    /*
    console.log("Day " + i + ": \n" + currentLanternfishAgesArray);
    console.log("Count born on day " + i + ": " + countBorn);
    console.log("----------------------------------------------------------"); 
    */
}

// Log final result
console.log("Count of lanternfish: " + currentLanternfishAgesArray.reduce((a, b) => a + b, 0));