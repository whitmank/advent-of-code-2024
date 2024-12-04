import * as fs from 'fs';

/** TODO
 * Processes input from a text file of numbers to an array.
 * @param: puzzleInput path to 'input.txt'
 * @returns: reports[][]
 */
function parseInput(puzzleInput: string): number[][] {
    // Read file
    const input = fs.readFileSync(puzzleInput, 'utf-8')
    // Parse every line into array object 'reports'
    const reports = input
        .split('\n')
        .filter(line => line.trim() !== '')
        .map(line => line
            .split(/\s+/)
            .filter(num => num.trim() !== '')
            .map(num => parseInt(num, 10))
        );
    return reports;

}

/** TODO
 * Evaluates if a single report is safe or unsafe.
 * @param report
 * @returns boolean — true if safe, false if unsafe.
 */
function isSafe(report: number[],): boolean {
    let isSafe = false;
    let badLevel = 0;
    for (let j = 0; j < report.length; j++) {
        isSafe = false;
        // If a level differs from the previous level by more than 3 => UNSAFE
        if (Math.abs(report[j + 1] - report[j]) > 3) { badLevel++ }

        // If a level is equal to the previous level => UNSAFE
        else if ((report[j] == report[j + 1])) { badLevel++ }

        // If levels increase then decrease => UNSAFE
        else if ((report[0] < report[1]) && ((report[j] > report[j + 1]))) { badLevel++ }

        // If levels decrease then increase =>
        else if ((report[0] > report[1]) && ((report[j] < report[j + 1]))) { badLevel++ }

        // If it passes the above conditions, guess it must be SAFE
        else {
            isSafe = true;
        }
    }
    if (badLevel > 1) {
        isSafe = false;
    }
    return isSafe;
}

/**
 * Evaluates all reports in a list of reports
 * @param reports number[][] 
 * @returns safeReportCount — # of safe reports.
 */
function evaluateReports(reports: number[][]): number {
    let safeReportCount = 0;
    // For every report
    for (let i = 0; i < reports.length; i++) {
        let report = reports[i];
        // If report is safe, add to count.
        if (isSafe(report)) {
            safeReportCount++;
        }
        // If report is not safe, apply the Problem Dampener. If it's safe now, add to count.
        // Else go to next report until none remain. 
    }
    return safeReportCount;
}


/** TODO
 * Applies "Problem Dampener" to a report. Taking the array and returning an array of all array subsets with one element removed.
 * Number of arrays returned is equal to the length of the original array. 
 * @param report
 * @returns true if report is safe.
 * @returns false if report is unsafe.
 */
function applyProblemDampener() {

}


/****************************************************************************************************/
/* Run program */
/****************************************************************************************************/
const inputFilePath = './input.txt';
const reports = parseInput('./input.txt')
let numSafeReports = evaluateReports(reports)

// Print number of safe reports.
console.log('Safe Reports:', numSafeReports);