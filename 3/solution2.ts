import { match } from "node:assert";
import * as fs from "node:fs"


const regexMul = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g
const regexDo = /do\(\)/
const regexDont = /don't\(\)/
const PATTERN = /mul\(([0-9]{1,3}),([0-9]{1,3})\)|do\(\)|don't\(\)/g

function parseInput(puzzleInput: string, pattern: RegExp): string[] {
    const input = fs.readFileSync(puzzleInput, 'utf-8');
    const matchingStrings: string[] = [];
    let match;
    while ((match = pattern.exec(input)) !== null) {
        matchingStrings.push(match[0]);
    }
    return matchingStrings;
}

function filterDisabled(matchingStrings: string[]): string[] {
    console.log(matchingStrings)
    const enabledStrings: string[] = [];
    // start enabled - accept all muls
    let enabled = true;
    matchingStrings.forEach(match => {
        if (enabled && regexMul.test(match)) {
            enabledStrings.push(match)
        }
        else if (regexDo.test(match)) {
            enabled = true;
        }
        else if (regexDont.test(match)) {
            enabled = false;
        }
    })
    return enabledStrings
}

function stringsToNumbers(enabledStrings: string[]): number[][] {
    const numbersToMultiply: number[][] = [];
    let match;
    for (let i = 0; i < enabledStrings.length; i++) {
        while ((match = regexMul.exec(enabledStrings[i])) != null) {
            numbersToMultiply.push([parseInt(match[1], 10), parseInt(match[2], 10)])
        }
    }
    return numbersToMultiply
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
/***************/
/* Run Program */
/***************/
const FILEPATH = './input.txt'

// PATTERN_MUL(000,000) = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g
// PATTERN_DO           = /do\(\)/
// PATTERN_DONT         = /don't\(\)/


const matchingStrings = parseInput(FILEPATH, PATTERN);
const enabledStrings = filterDisabled(matchingStrings);
const numberPairs = stringsToNumbers(enabledStrings);

const products: number[] = [];
numberPairs.forEach(pair => {
    const product = multiplyNums(pair);
    products.push(product);
})

const sumOfProducts = sumNums(products);

console.log("Sum: ", sumOfProducts);