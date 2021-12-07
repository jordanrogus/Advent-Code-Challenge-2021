// Read input file and push it to an array
var fs = require("fs");
var text = fs.readFileSync("./input-04").toString('utf-8');
var array = text.split("\n");

// Retrieve bingoInput from array. Input is stored as the first element of the array. Resulting array is only the bingo boards
let bingoInput = array.shift();
bingoInput = bingoInput.split(',');

// Retrieve a multi dim array for the bingo board
let bingoBoardMultiDimArray = _createMultiDimensionalArray(array);

// Function for part 1
const partOne = (bingoInput, bingoBoardMultiDimArray) => {

    // Initialize updated board
    let updatedBingoBoards = bingoBoardMultiDimArray;

    // Query over each bingo input
    for (i = 0; i < bingoInput.length; i++) {

        // Replace the bingo input in the updatedBingoBoards with a ''
        updatedBingoBoards = _replaceElementIn3DArray(updatedBingoBoards, bingoInput[i]);

        // Query over each bingo board
        for (j = 0; j < updatedBingoBoards.length; j++) {

            // Check to see if the board won
            let win = _checkBoard(updatedBingoBoards[j]);

            // If board has won
            if (win == true) {

                // Get the numer that was just called
                let winningNumber = bingoInput[i];

                // Get the sum of the unmarked numbers
                let sumUnmarked = _arrSum(updatedBingoBoards[j]);

                // Final score = winningNumber * sumUnmarked;
                let finalScore = winningNumber * sumUnmarked;

                // Return final score
                return finalScore;
            }
        }
    } 
    return 'No boards won';
}

// Log result
console.log('Part One: ' + partOne(bingoInput, bingoBoardMultiDimArray));

//////////////////////// HELPER FUNCTIONS ////////////////////////

// Function to create a multidimensional array to store each bingo card
// @param array - Input array
// @param value - Value to be removed from input array while create the multidim array
function _createMultiDimensionalArray(array) {

    // Retrieve the number of bingo boards in the input array by retrieving the amount of spaces separating them
    numberOfBingoBoards = array.filter(function (item) {
        return item == "";
    }).length;

    // Remove spaces from array and store the result as an array called bingoBoards
    bingoBoardsArray = array.filter(function (item) {
        return item != "";
    });

    // Retrieve the number of rows in a bingo board by dividing the length of the bingBoards array by the number of bingo boards
    let rowsPerBoard = bingoBoardsArray.length / numberOfBingoBoards;

    // Initialize new array
    let arr = new Array(numberOfBingoBoards);

    // Initialize value to track which line of the bingo board we are on
    let bingoBoardLineTracker = 0;

    // Populate array by looping through each board
    for (i = 0; i < arr.length; i++) {

        // Create a subarray
        let subarray = [];

        // Populate subarray with array of each bingo board row that is not empty
        for (z = bingoBoardLineTracker; z < bingoBoardLineTracker + rowsPerBoard; z++) {
            subarray.push(bingoBoardsArray[z].split(" ").filter(function (item) {
                return item != "";
            }));
        }

        // Append the subarray to the array
        arr[i] = subarray;

        // Update the bingo board line tracker
        bingoBoardLineTracker += rowsPerBoard;

    }

    // Return array
    return arr;
}

// Function to replace an element
// @param array - Input array
// @param element - Value to be replaced with ""
function _replaceElementIn3DArray(arr, element) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            for (var k = 0; k < arr[i][j].length; k++) {
                if (arr[i][j][k] == element) {
                    arr[i][j].splice(k, 1, "");
                }
            }
        }
    }
    return arr;
}

// Function to check if a board has won
// @param array - Input array
function _checkBoard(array) {

    // Initialize values
    let origArray = array;
    let win = false;

    // Check for a horizontal win
    for (var i = 0; i < origArray.length; i++){
        if (origArray[i].every(element => element === '')){
            win = true;
        } 
    }

    // Transpose array
    let newArray = array[0].map((_, colIndex) => array.map(row => row[colIndex]));

    // Use transposed array to check for a veritcal win
    for (var i = 0; i < newArray.length; i++){
        if (newArray[i].every(element => element === '')){
            win = true;
        } 
    }

    // Return boolean
    return win;
}

// Function to calcualte all values on a board that are not ""
// @param arr - Input array
function _arrSum(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            if (arr[i][j] != ""){
                sum += parseInt(arr[i][j]);
            }
        }
    }
    return sum;
}