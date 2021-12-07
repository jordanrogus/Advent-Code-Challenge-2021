// Read input file and push it to an array
var fs = require("fs");
var text = fs.readFileSync("./input-05").toString('utf-8');
var array = text.split("\n");

// Retrieve multi dimensional array
let coordInput2DArray = _createMultiDimensionalArray(array);

// Initialize coordinate map array which will hold the output
let coordinateMap = [];

// Loop through input multi dimensional array
for (i = 0; i < coordInput2DArray.length; i++){

    // Retrieve coordinate endpoints
    let x1 = coordInput2DArray[i][0].toString().split(',')[0].trim();
    let y1 = coordInput2DArray[i][0].toString().split(',')[1].trim();
    let x2 = coordInput2DArray[i][1].toString().split(',')[0].trim();
    let y2 = coordInput2DArray[i][1].toString().split(',')[1].trim();

    // Log for testing
    // console.log("x1: " + x1 + ", y1: " + y1 + ", x2: " + x2 + ", y2: " + y2);

    // Return an array of coordinates between the inputted coordinates
    let coordArray = _retrieveCoordinates(x1, y1, x2, y2);

    // Log for testing
    // console.log("Coordinate Array: \n" + coordArray);

    // For each coordinate in the coordArray
    for (j = 0; j < coordArray.length; j++){

        // Retrieve the x and y coordinates
        let x1 = coordArray[j][0];
        let y1 = coordArray[j][1];

        // Store the coordinates in the coordinate map
        _storeCoordinate(x1, y1, coordinateMap);
    }

    // Log for testing
    // console.log('--------------------------------------');
}

//Log for testing - Note: coordinateMap is an array of objects
// console.log("Coord Map: \n" + coordinateMap);

//Filter the array of objects to get the count of array with a coordinate count > 2
var result = coordinateMap.filter(obj => {
    return obj.count >= 2
  }).length;

// Log result
console.log("Part B: " + result);

//////////////////////// HELPER FUNCTIONS ////////////////////////

// Function to create a multi dimensional array from the input
function _createMultiDimensionalArray(array){

    // Initialize multi dimenstional array
    let multidimensionalArray = new Array(array.length)

    // Populate array
    for(i = 0; i < array.length; i++){
        const subArray = array[i].toString().split("->");
        multidimensionalArray[i] = subArray;
    }

    // Return multidimensional array
    return multidimensionalArray;
}

// Function to retrieve horizontal, vertical and diagnol points between two passed in endpoints (as x1,y1 and x2,y2)
function _retrieveCoordinates(x1, y1, x2, y2) {

    // Initialize final array
    let finalArray = [];

    // Calculate the slope as an absolute value
    let slope = 0;
    slope = Math.abs((parseInt(y2) - parseInt(y1))/(parseInt(x2) - parseInt(x1)));

    // Create arrays of the x-values and y-values where they are ordererd lowest -> highest
    let arrX = [Math.min(x1, x2),Math.max(x1, x2)];
    let arrY = [Math.min(y1, y2),Math.max(y1, y2)];

    // If horizontal or vertical
    if(x1==x2 || y1==y2){

        // Calculate the coordinates on the line segments and push to the finalArray
        for(let x=arrX[0]; x<=arrX[1]; x++){
            for(let y=arrY[0]; y<=arrY[1]; y++){
                subarray = [];
                subarray[0] = x;
                subarray[1] = y;
                finalArray.push(subarray);
            }
        }

        // If diagnoal (@45 degrees)
        } else if (slope == 1){
            for(let x=arrX[0]; x<=arrX[1]; x++){
                for(let y=arrY[0]; y<=arrY[1]; y++){
                    subarray = [];
                    subarray[0] = x;
                    subarray[1] = y;

                    // Calculate cross-product
                    let crossProduct = (x2 - x1) * (y - y1) == (x - x1) * (y2 - y1);
                    
                    // If cross-product is true the coordinate is on the diagnoal and should be pushed to the final array
                    if (crossProduct == true){
                        finalArray.push(subarray);
                    }
                }
            }
        }
    return finalArray;
}

// Function to store the passed in coordinaes into the passed into array
function _storeCoordinate(xVal, yVal, array) {

    // Check if the coordinates already exist in the passed in array. If so then add to the coount property
    for (var i in array) {
        if (array[i].x == xVal && array[i].y == yVal) {
            let count = array[i].count;
            count = count + 1;
            array[i].count = count;
            return;
        }
    }

    // Push the coordinates to the array if not found in the passed in array
    array.push({x: xVal, y: yVal, count: 1});
}