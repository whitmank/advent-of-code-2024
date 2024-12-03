"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
/** TODO
 * Processes input from a text file of numbers to an array.
 * @param puzzleInput path to input.txt
 * @returns locations[{ num1, num2 }]
 */
function parseInput(puzzleInput) {
    // Read file
    var input = fs.readFileSync(puzzleInput, 'utf-8');
    // Parse each line of the file into an array of objects => locations[] = {num1, num2}
    var locations = input
        .split('\n')
        .filter(function (line) { return line.trim() !== ''; }) // Filter out empty lines
        .map(function (line) {
        var _a = line
            .trim()
            .split(/\s+/)
            .map(Number), num1 = _a[0], num2 = _a[1];
        return { num1: num1, num2: num2 };
    });
    return locations;
}
/** TODO
 * Sorts the location array by splitting num1 and num2 components into separate arrays.
 * @param parsedLocations[]
 * @returns sortedLocations = { sortedNum1: number[], sortedNum2: number[] }
 */
function sortLists(locations) {
    // Split array into two lists, and sort each one in ascending order
    var sortedNum1 = locations.map(function (loc) { return loc.num1; }).sort(function (a, b) { return a - b; });
    var sortedNum2 = locations.map(function (loc) { return loc.num2; }).sort(function (a, b) { return a - b; });
    var sortedLocations = { sortedNum1: sortedNum1, sortedNum2: sortedNum2 };
    return sortedLocations;
}
/** TODO
 * Computes sum of differences between each corresponding pair {sortedNum1, sortedNum2}.
 * @param { sortedNum1[], sortedNum2[] }
 * @returns number distanceSum
 */
function computeSumOfDistances(sortedLocations) {
    var distanceSum = 0;
    var sortedNum1 = sortedLocations.sortedNum1;
    var sortedNum2 = sortedLocations.sortedNum2;
    for (var i = 0; i < sortedNum1.length; i++) {
        distanceSum += Math.abs(sortedNum1[i] - sortedNum2[i]);
    }
    return distanceSum;
}
/** TODO
 * Computes similarity score of each corresponding pair {sortedNum1, sortedNum2}.
 * @param { sortedNum1[], sortedNum2[] }
 * @returns number similarityScore
 */
function computeSimilarityScore(sortedLocations) {
    // Compute Similarity Score
    var similarityScore = 0;
    var sortedNum1 = sortedLocations.sortedNum1;
    var sortedNum2 = sortedLocations.sortedNum2;
    for (var i = 0; i < sortedNum1.length; i++) {
        var freqNum1 = 0;
        for (var j = 0; j < sortedNum2.length; j++) {
            if (sortedNum1[i] == sortedNum2[j]) {
                freqNum1++;
            }
        }
        similarityScore += sortedNum1[i] * freqNum1;
    }
    return similarityScore;
}
/****************************************************************************************************/
/* Run program */
/****************************************************************************************************/
var inputFilePath = './input.txt';
var locations = parseInput(inputFilePath);
var sortedLocations = sortLists(locations);
var distanceSum = computeSumOfDistances(sortedLocations);
var similarityScore = computeSimilarityScore(sortedLocations);
console.log("Distance:", distanceSum);
console.log("Similarity Score:", similarityScore);
