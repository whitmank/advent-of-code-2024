import * as fs from 'fs';

function readFile(input: File): Array {
    
}
// Read file
const input = fs.readFileSync('input.txt', 'utf-8')
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
// Each line of input is a report.
// report = {[1], [2], [3], [4], [5]...}

// Logic:
// If a report doesn't meet any conditions for being UNSAFE, then it must be SAFE.
let safeReportCounter = 0;
for (let i = 0; i < reports.length; i++) {
    let isSafe;
    const report = reports[i];

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

// Output
console.log('Safe Reports', safeReportCounter);
