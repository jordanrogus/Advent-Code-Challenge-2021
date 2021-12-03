// Read input file and push it to an array
var fs = require("fs");
var text = fs.readFileSync("./input-03").toString('utf-8');
var array = text.split("\n");

// Function to retrieve the binary based on the passed in type
// If the type = o2 then return binary based on calculations of most frequent binary value
// If the type = co2 then return binary based on calculations of lease frequent binary value
// type = o2 or co2 per problem statement
const retrieveBinary = (array, type) => {

    // Character length of string within array - All are same length
    let charLength = array[0].length;

    // Create subarray for each position in the string
    for (let i = 0; i < charLength; i++) {

        // Initialize subarray
        let subArray = [];

        // For each array in the input
        for (let j = 0; j < array.length; j++) {

            // Push the character at the defined position to the subarray
            subArray.push(array[j].toString().charAt(i));

        }

        let char = '';

        if (type == 'o2'){
            let mostFrequentArray = _getMostFrequent(subArray);
            if (mostFrequentArray.length == 1){
                char = mostFrequentArray[0];
            } else {
                char = '1';
            }
        }

        if (type == 'co2'){
            // least Freq needs to return an array
            let leastFrequentArray = _getLeastFrequent(subArray);
            if (leastFrequentArray.length == 1){
                char = leastFrequentArray[0];
            } else {
                char = '0';
            }
        }

        // Filter array to only include items that meet the condition
        array = array.filter(item => item.charAt(i) == char);

        if (array.length == 1){
            return array[0];
        }

    }

}

// Retrieve binaries based on input array and type
let o2Rating = retrieveBinary(array, 'o2');
let co2Rating = retrieveBinary(array, 'co2');

// Convert binaries to digit
let o2Digit = parseInt(o2Rating, 2);
let co2Digit = parseInt(co2Rating, 2);

// Calculate Life Support Rating
let lifeSupportRating = o2Digit * co2Digit;

// Log Life Support Rating
console.log(lifeSupportRating);

//////////////////////// HELPER FUNCTIONS ////////////////////////

// Return most frequent element(s) in array as an array
function _getMostFrequent(arr) {
    const hashmap = arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1
        return acc
    }, {})
    return Object.keys(hashmap).filter(x => {
        return hashmap[x] == Math.max.apply(null, 
        Object.values(hashmap))
  })
}

// Return least frequent element(s) in array as an array
function _getLeastFrequent(arr) {
    const hashmap = arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1
        return acc
    }, {})
    return Object.keys(hashmap).filter(x => {
        return hashmap[x] == Math.min.apply(null, 
        Object.values(hashmap))
  })
}