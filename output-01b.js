// Code to read an input file and push it to an array
var fs = require("fs");
var text = fs.readFileSync("./input-01").toString('utf-8');
var textByLine = text.split("\n")

// Initialize count and new array
var countIncreases = 0;
var summedArray = [];

// Loop through array, and create a new array with the laddered sums
for (var i = 0; i < textByLine.length; i++) {
  var meas1 = parseInt(textByLine[i]);
  var meas2 = parseInt(textByLine[i + 1]);
  var meas3 = parseInt(textByLine[i + 2]);
  if (typeof (meas1) !== "undefined" || typeof (meas2) !== "undefined" || typeof (meas3) !== "undefined") {
    var sum = meas1 + meas2 + meas3;
  }
  summedArray.push(sum)
}

// Loop through laddered array and check if the next sum is greater - If so add to count
for (var i = 0; i < summedArray.length; i++) {
  if (typeof (summedArray[i + 1]) !== "undefined") {
    if (parseInt(summedArray[i + 1]) > parseInt(summedArray[i])) {
      countIncreases++;
    }
  }
}

// Logging to consle
// To log to console run: node <filename> when your console is in the correct folder
console.log(countIncreases);