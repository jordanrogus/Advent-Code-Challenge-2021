// Read input file and push it to an array
var fs = require("fs");
var text = fs.readFileSync("./input-02").toString('utf-8');
var array = text.split("\n");

// Function to create a multi dimensional array from the input
const createMultiDimensionalArray = array => {

    // Initialize multidimensional array with size of the input array
    let multidimensionalArray = new Array(array.length);

    // For each array - append the subarray created from splitting the input string to the multidimensional array
    for (let i = 0; i < array.length; i++) {
        const subArray = array[i].toString().split(" ");
        multidimensionalArray[i] = subArray;
    }

    // Return multidimensional array
    return multidimensionalArray;
}

// Retrieve the multidimensional array from the input array
let multiDimArray = createMultiDimensionalArray(array);

// Function to calculate the position and depth
const calcPosDepth = multiDimArray => {

    // Initialize values
    let horizontalPosition = 0;
    let depth = 0;
    let aim = 0;
    let calc = 0;

    // Loop array
    for (let i = 0; i < multiDimArray.length; i++) {
        
        // Based on array's first position calculate the horizontal position and depth using logic defined in problem statement (i.e. aim for up and down)
        if (multiDimArray[i][0] == "forward"){
            horizontalPosition += parseInt(multiDimArray[i][1]);
            depth += (aim*parseInt(multiDimArray[i][1]));
        } else if (multiDimArray[i][0] == "up"){
            aim -= parseInt(multiDimArray[i][1]);
        } else if (multiDimArray[i][0] == "down"){
            aim += parseInt(multiDimArray[i][1]);
        }

    }

    // Calculation
    calc = horizontalPosition * depth

    // Return calculation
    return calc;
}

// Log result
console.log(calcPosDepth(multiDimArray));