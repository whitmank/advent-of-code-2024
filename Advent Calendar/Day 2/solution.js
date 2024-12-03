"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// Read file
var input = fs.readFileSync('input.txt', 'utf-8');
// Parse every line into array object 'reports'
var reports = input
    .split('\n')
    .filter(function (line) { return line.trim() !== ''; })
    .map(function (line) { return line
    .split(/\s+/)
    .filter(function (num) { return num.trim() !== ''; })
    .map(function (num) { return parseInt(num, 10); }); });
reports.forEach(function (report) { return console.log(report); });
// Each line of input is a report.
// report = {[1], [2], [3], [4], [5]...}
// Logic:
// If a report doesn't meet any conditions for being UNSAFE, then it must be SAFE.
var safeReportCounter = 0;
for (var i = 0; i < reports.length; i++) {
    var isSafe = void 0;
    var report = reports[i];
    for (var j = 0; j < report.length; j++) {
        isSafe = false;
        // If a level differs from the previous level by more than 3 => UNSAFE
        if (Math.abs(report[j + 1] - report[j]) > 3) {
            break;
        }
        // If a level is equal to the previous level => UNSAFE
        else if ((report[j] == report[j + 1])) {
            break;
        }
        // If levels increase then decrease => UNSAFE
        else if ((report[0] < report[1]) && ((report[j] > report[j + 1]))) {
            break;
        }
        // If levels decrease then increase =>
        else if ((report[0] > report[1]) && ((report[j] < report[j + 1]))) {
            break;
        }
        // If it passes the above conditions, guess it must be SAFE
        else {
            isSafe = true;
        }
    }
    if (isSafe == true) {
        safeReportCounter++;
    }
}
// Output
console.log('Safe Reports', safeReportCounter);
