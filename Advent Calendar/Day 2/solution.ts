import * as fs from 'fs';

/** TODO
 * Processes input from a text file of numbers to an array.
 * @param: puzzleInput
 * @returns: reports[][]
 */
function parseInput(puzzleInput: File): Array {
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
    
    reports.forEach(report => console.log(report))

}

function sortArrays() {
    
}

/** TODO
 * Evaluates if a report is safe or unsafe.
 * @param report
 * @returns true if report is safe.
 * @returns false if report is unsafe.
 */
function evaluateReport(report: Array,): boolean {
    let isSafe;
    
    for (let j = 0; j < report.length; j++) {
        isSafe = false;
        // If a level differs from the previous level by more than 3 => UNSAFE
        if (Math.abs(report[j + 1] - report[j]) > 3) { break }
        
        // If a level is equal to the previous level => UNSAFE
        else if ((report[j] == report[j + 1])) { break }
        
        // If levels increase then decrease => UNSAFE
        else if ((report[0] < report[1]) && ((report[j] > report[j + 1]))) { break }
        
        // If levels decrease then increase =>
        else if ((report[0] > report[1]) && ((report[j] < report[j + 1]))) { break }
        
        // If it passes the above conditions, guess it must be SAFE
        else {
            isSafe = true;
        }
    }
    if (isSafe == true) {
        safeReportCounter++
    }
}


/** TODO
 * Evaluates if a report (that is normally unsafe) is safe or unsafe WITH the "Problem Dampener". 
 * @param report
 * @returns true if report is safe.
 * @returns false if report is unsafe.
 */
function evaluateReportWithProblemDampener(report: Array): boolean {

}


/****************************************************************************************************/
/* Run program */
/****************************************************************************************************/
let safeReportCounter = 0;

parseInput("input.txt");
// For every report
for (let i = 0; i < reports.length; i++) {
    let report = reports[i];
    // If report is safe, add to count.
    if (evaluateReport(report)) {
        safeReportCounter++;
    }
    // If report is not safe, apply the Problem Dampener. If it's safe now, add to count.
    else if (evaluateReportWithProblemDampener(report)) {
        safeReportCounter++;
    }
    // Else go to next report until none remain. 
}

// Print number of safe reports.
console.log('Safe Reports:', safeReportCounter);
