import * as fs from "node:fs"

/**
 * 
 * @param puzzleInput filepath to input.txt
 * @param pattern RegExp
 * @returns matches: number[][]
 */
function parseInput(puzzleInput: string, pattern: RegExp): number[][] {
    const input = fs.readFileSync(puzzleInput, 'utf-8');
    const matches: number[][] = [];
    let match;
    while ((match = pattern.exec(input)) !== null) {
        matches.push([parseInt(match[1], 10), parseInt(match[2], 10)]);
    }
    return matches;
}
/**
 * Takes an array of numbers and returns the product.
 * @param nums 
 * @returns product
 */
function multiplyNums(numbers: number[]): number {
    return numbers.reduce((product, number) => product * number, 1);
}
/**
 * Takes an array of numbers and returns the sum.
 * @param numbers 
 * @returns sum
 */
function sumNums(numbers: number[]): number {
    return numbers.reduce((product, number) => product + number, 0);
}
/****************************************************************************************************/
/* Run program */
/****************************************************************************************************/
const FILEPATH = './input.txt'
const PATTERN = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;
const matches = parseInput(FILEPATH, PATTERN);

const products: number[] = [];
matches.forEach(match => {
    const product = multiplyNums(match);
    products.push(product);
})

const sumOfProducts = sumNums(products);

console.log("Sum: ", sumOfProducts);

