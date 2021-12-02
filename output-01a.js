// Code to read an input file and push it to an array
var fs = require("fs");
var text = fs.readFileSync("./input-01").toString('utf-8');
var textByLine = text.split("\n")

// Initialize count
var countIncreases = 0;

/* LOOP THROUGH ARRAY WITH FUNCTION */
/*
// Loop through array
for (var i = 0; i < textByLine.length; i++) {
  if (typeof (textByLine[i + 1]) !== "undefined") {
    if (parseInt(textByLine[i + 1]) > parseInt(textByLine[i])) {
      countIncreases++;
    }
  }
}
*/

/* LOOP THROUGH ARRAY WITH CONST */
const hasIncreased = textByLine => {
  for (let i = 0; i < textByLine.length; i++) {
    let current = parseInt(textByLine[i]);
    let next = parseInt(textByLine[i + 1]);

    if (next !== "undefined") {
      if (next > current) {
        countIncreases++;
      }
    }
  }
  return countIncreases;
}

// Logging to consle
// To log to console run: node <filename> when your console is in the correct folder
console.log(hasIncreased(textByLine));