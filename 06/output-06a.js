// Read input file and push it to an array
var fs = require("fs");
var text = fs.readFileSync("./input-06").toString('utf-8');
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

    // Loop through each element in the array
    for (j = 0; j < currentLanternfishAgesArray.length; j++) {

        // Check if any element in the array is not 0 then subtract one 
        if (currentLanternfishAgesArray[j] != 0) {
            currentLanternfishAgesArray.splice(j, 1, currentLanternfishAgesArray[j] - 1);
        // Check if any element in the array is 0 then replace with a 6 and add the the count of new lantern fish
        } else {
            currentLanternfishAgesArray.splice(j, 1, 6);
            countNewLanternFish++;
        }
    }

    // For each new lantern fish append to the array with an '8'
    for (k = 1; k <= countNewLanternFish; k++) {
        currentLanternfishAgesArray.push(8);
    }
    /*
    console.log("Day " + i + ": \n" + currentLanternfishAgesArray);
    console.log("----------------------------------------------------------"); 
    */
}

console.log("Count of Lantern Fish: " + currentLanternfishAgesArray.length);