import * as fs from 'node:fs';

/** TODO
 * Processes input from a text file of numbers to an array.
 * @param puzzleInput path to 'input.txt'
 * @returns locations[{ num1, num2 }]
 */
function parseInput(puzzleInput: string): Array<{ num1: number; num2: number }> {
    // Read file
    const input = fs.readFileSync(puzzleInput, 'utf-8')
    // Parse each line of the file into an array of objects => locations[] = {num1, num2}
    const locations = input
        .split('\n')
        .filter(line => line.trim() !== '') // Filter out empty lines
        .map(line => {
            const [num1, num2] = line
                .trim()
                .split(/\s+/)
                .map(Number);
            return { num1, num2 };
        })
        return locations;
}

/** TODO
 * Sorts the location array by splitting num1 and num2 components into separate arrays.
 * @param locations[]
 * @returns sortedLocations = { sortedNum1: number[], sortedNum2: number[] }
 */

function sortLists(locations: Array<{ num1: number; num2: number }>): { sortedNum1: number[]; sortedNum2: number[]; } {

    // Split array into two lists, and sort each one in ascending order
    const sortedNum1 = locations.map(loc => loc.num1).sort((a, b) => a - b);
    const sortedNum2 = locations.map(loc => loc.num2).sort((a, b) => a - b);
    const sortedLocations = { sortedNum1, sortedNum2 };
    return sortedLocations
}

/** TODO 
 * Computes sum of differences between each corresponding pair {sortedNum1, sortedNum2}.
 * @param { sortedNum1[], sortedNum2[] }
 * @returns number distanceSum
 */
function computeSumOfDistances(sortedLocations: { sortedNum1: number[], sortedNum2: number[]}): number{

    let distanceSum = 0;
    let sortedNum1 = sortedLocations.sortedNum1;
    let sortedNum2 = sortedLocations.sortedNum2;

    for (let i = 0; i < sortedNum1.length; i++) {
        distanceSum += Math.abs(sortedNum1[i] - sortedNum2[i])
    }
    return distanceSum;
}

/** TODO
 * Computes similarity score of each corresponding pair {sortedNum1, sortedNum2}.
 * @param { sortedNum1[], sortedNum2[] }
 * @returns number similarityScore
 */
function computeSimilarityScore(sortedLocations: { sortedNum1: number[], sortedNum2: number[]}): number {

    // Compute Similarity Score
    let similarityScore = 0;
    let sortedNum1 = sortedLocations.sortedNum1;
    let sortedNum2 = sortedLocations.sortedNum2;

    for (let i = 0; i < sortedNum1.length; i++) {
        let freqNum1 = 0;
        for (let j = 0; j < sortedNum2.length; j++) {
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
const inputFilePath = './input.txt'
const locations = parseInput(inputFilePath)
const sortedLocations = sortLists(locations)

let distanceSum = computeSumOfDistances(sortedLocations)
let similarityScore = computeSimilarityScore(sortedLocations)

console.log("Distance:", distanceSum);
console.log("Similarity Score:", similarityScore);