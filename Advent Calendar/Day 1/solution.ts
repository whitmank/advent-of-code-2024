import * as fs from 'fs';

/** TODO
 * Processes input from a text file of numbers to an array.
 * @param puzzleInput 
 * @returns locations[{ num1, num2 }]
 */
function parseInput(puzzleInput: File) {
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
            // console.log('Parsed numbers:', { num1, num2 });
            return { num1, num2 };
        })
}

/** TODO
 * Sorts the location array by splitting num1 and num2 components into separate arrays.
 * @param locations[]
 * @returns sortedNum1[]
 * @returns sortedNum2[]
 */

function sortLists() {
    // Split array into two lists, and sort each one in ascending order
    const sortedNum1 = locations.map(loc => loc.num1).sort((a, b) => a - b);
    const sortedNum2 = locations.map(loc => loc.num2).sort((a, b) => a - b);
}

/** TODO 
 * Computes sum of differences between each corresponding pair {sortedNum1, sortedNum2}.
 * @param sortedNum1[]
 * @param sortedNum2[]
 * @returns Int distanceSum
 */
function computeSumOfDistances() {

    let distanceSum = 0;

    for (let i = 0; i < sortedNum1.length; i++) {
        distanceSum += Math.abs(sortedNum1[i] - sortedNum2[i])
    }
    return distanceSum;
}

/** TODO
 * Computes similarity score of each corresponding pair {sortedNum1, sortedNum2}.
 * @param sortedNum1[]
 * @param sortedNum2[]
 * @returns Int distanceSum
 */
function computeSimilarityScore() {

    // Compute Similarity Score
    let similarityScore = 0;

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

parseInput();
computeSumOfDistances();
computeSimilarityScore();

console.log("Distance:", distanceSum);
console.log("Similarity Score:", similarityScore);