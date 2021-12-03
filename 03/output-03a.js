// Read input file and push it to an array
var fs = require("fs");
var text = fs.readFileSync("./input-03").toString('utf-8');
var array = text.split("\n");

// Function to create a multi dimensional array from the input
const createMultiDimensionalArray = array => {

    // Character length of string within array - All are same length
    let charLength = array[0].length;

    // Initialize multidimensional array with size of the string
    let multidimensionalArray = new Array(charLength);

    // Create subarray for each position in the string
    for (let i = 0; i < charLength; i++) {

        // Initialize subarray
        let subArray = [];

        // For each array in the input
        for (let j = 0; j < array.length; j++) {

            // Push the character at the defined position to the subarray
            subArray.push(array[j].toString().charAt(i));

        }

        // Append subarray to multidimensional array
        multidimensionalArray[i] = subArray;

    }

    // Return multidimensional array
    return multidimensionalArray;
}

// Retrieve the multidimensional array from the input array
let multiDimArray = createMultiDimensionalArray(array);

// Function to calculate power
const calcPower = multiDimArray => {

    // Initialize values
    let gammaRate = "";
    let epsilonRate = "";
    let powerRate = 0;

    // Loop through each array in the multiDimArray
    for (let i = 0; i < multiDimArray.length; i++) {

        // Get most frequent character and add to gammaRate
        let mostFrequent = _getMostFrequent(multiDimArray[i]);
        gammaRate = gammaRate.concat(mostFrequent);

        // Get least frequent character and add to epsilonRate
        let leastFrequent = _getLeastFrequent(multiDimArray[i]);
        epsilonRate = epsilonRate.concat(leastFrequent);

    }

    // Convert to digit
    let gammaDigit = parseInt(gammaRate, 2);
    let epsilonDigit = parseInt(epsilonRate, 2);

    // Calculate Power
    powerRate = gammaDigit * epsilonDigit;

    // Return Power
    return powerRate;
}

// Log result
console.log(calcPower(multiDimArray));

//////////////////////// HELPER FUNCTIONS ////////////////////////

// Return most frequent element in array as a string
function _getMostFrequent(arr) {
    const hashmap = arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1
        return acc
    }, {})
    return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
}

// Return least frequent element in array as a string
function _getLeastFrequent(arr) {
    //Store the number counts in object
    const count = arr.reduce((a, b) => {
        if (!a[b]) {
        a[b] = 1;
        } else {
        a[b]++;
        }

        return a;
    }, {});

    
    let minCount = Number.MAX_SAFE_INTEGER;
    let numberWithLeastCount = 0;

    //Find the number with least count
    for (const [key, value] of Object.entries(count)) {
        if (value < minCount) {
        minCount = value;
        numberWithLeastCount = key;
        }
    }

    return numberWithLeastCount;
}