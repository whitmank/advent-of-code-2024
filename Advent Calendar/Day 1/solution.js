"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// Read file
var input = fs.readFileSync('input.txt', 'utf8');
// Parse each line of the file into an
// array of objects => locations[] = {num1, num2}
var locations = input.split('\n')
    .filter(function (line) { return line.trim() !== ''; }) // Filter out empty lines
    .map(function (line) {
    var _a = line
        .trim()
        .split(/\s+/)
        .map(Number), num1 = _a[0], num2 = _a[1];
    // console.log('Parsed numbers:', { num1, num2 });
    return { num1: num1, num2: num2 };
});
// sort the lists from least to greatest
var sortedNum1 = locations.map(function (loc) { return loc.num1; }).sort(function (a, b) { return a - b; });
var sortedNum2 = locations.map(function (loc) { return loc.num2; }).sort(function (a, b) { return a - b; });
console.log("sortedNum1:", sortedNum1, sortedNum2);
// Distance
var distanceSum = 0;
for (var i = 0; i < sortedNum1.length; i++) {
    distanceSum += Math.abs(sortedNum1[i] - sortedNum2[i]);
}
// Similarity Score
var similarityScore = 0;
for (var i = 0; i < sortedNum1.length; i++) {
    var freqNum1 = 0;
    for (var j = 0; j < sortedNum2.length; j++) {
        if (sortedNum1[i] == sortedNum2[j]) {
            freqNum1++;
        }
    }
    similarityScore += sortedNum1[i] * freqNum1;
}
console.log("Distance", distanceSum);
console.log("Similarity Score:", similarityScore);
