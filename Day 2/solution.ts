import * as fs from 'node:fs';

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
    let safe = false;
    for (let j = 0; j < report.length; j++) {
        safe = false;
        // If a level differs from the previous level by more than 3 => UNSAFE
        if (Math.abs(report[j + 1] - report[j]) > 3) { break }

        // If a level is equal to the previous level => UNSAFE
        else if ((report[j] == report[j + 1])) { break }

        // If levels increase then decrease => UNSAFE
        else if ((report[j] < report[j + 1]) && ((report[j + 1] > report[j + 2]))) { break }

        // If levels decrease then increase =>
        else if ((report[j] > report[j + 1]) && ((report[j + 1] < report[j + 2]))) { break }

        // If it passes the above conditions, guess it must be SAFE
        else {
            safe = true;
        }
    }

    return safe;
}
/**
 * Evaluates all reports in a list of reports
 * @param reports number[][] 
 * @returns safeReportCount — # of safe reports.
*/
function evaluateReports(reports: number[][]): number {
    let safeReportCount = 0;
    // For every report
    for (let i = 0; i < reports.length; i++) {
        const report = reports[i];
        // If report is safe, add to count.
        if (isSafe(report)) {
            safeReportCount++;
        }
        // If report is not safe, apply the Problem Dampener. If it's safe now, add to count.
        // Else go to next report until none remain. 
    }
    return safeReportCount;
}

/**
 * Takes a report and runs isSafe on 2 subReports with potential offending indexes removed.
 * @param report 
 * @param index1 
 * @param index2 
 */
function problemDampener(report: number[]): boolean {
    let safe = false;
    for (let i = 0; i < report.length; i++) {
        const subReport = report.toSpliced(i, 1);
        if (isSafe(subReport)) {
            safe = isSafe(subReport)
        }
    }
    return safe;
}

/** TODO
 * Evaluates if a single report is safe or unsafe. — WITH PROBLEM DAMPENER
 * @param report
 * @returns boolean — true if safe, false if unsafe.
 */
function isSafePD(report: number[]): boolean {
    let safe = false;
    for (let j = 0; j < report.length; j++) {
        safe = false;
        // If a level differs from the previous level by more than 3 => UNSAFE
        if (Math.abs(report[j + 1] - report[j]) > 3) {
            safe = problemDampener(report);
            return safe;
        }
        // If a level is equal to the previous level => UNSAFE
        else if ((report[j] == report[j + 1])) {
            safe = problemDampener(report);
            return safe;
        }
        // If levels increase then decrease => UNSAFE
        else if ((report[j] < report[j + 1]) && ((report[j + 1] > report[j + 2]))) {
            safe = problemDampener(report);
            return safe;
        }
        // If levels decrease then increase => UNSAFE
        else if ((report[j] > report[j + 1]) && ((report[j + 1] < report[j + 2]))) {
            safe = problemDampener(report);
            return safe;
        }
        // If it passes the above conditions, it must be SAFE
        else {
            safe = true;
        }
    }
    return safe;
}
/** TODO
 * Evaluates all reports in a list of reports - WITH PROBLEM DAMPENER
 * @param reports number[][] 
 * @returns safeReportCount — # of safe reports.
*/
function evaluateReportsWithPD(reports: number[][]): number {
    let safeReportCount = 0;
    // For every report
    for (let i = 0; i < reports.length; i++) {
        const report = reports[i];

        // If report is safe, add to count.
        if (isSafePD(report)) {
            safeReportCount++;
        }
        // Else go to next report until none remain. 
    }
    return safeReportCount;
}




/****************************************************************************************************/
/* Run program */
/****************************************************************************************************/
const inputFilePath = './input.txt';
const reports = parseInput(inputFilePath);
const numSafeReports = evaluateReports(reports);
const numSafeWithPD = evaluateReportsWithPD(reports);

// const test = [77, 77, 74, 72, 71, 69, 66, 61]
// console.log("Test Report: ", test)
// evaluateReportsWithPD([test])


// Print number of safe reports.
console.log('Safe Reports:', numSafeReports);
console.log('Safe Reports with Problem Dampener:', numSafeWithPD);

// 82 85 86 83 85 87 89 