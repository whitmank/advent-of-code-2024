"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
/** TODO
 * Processes input from a text file of numbers to an array.
 * @param: puzzleInput path to 'input.txt'
 * @returns: reports[][]
 */
function parseInput(puzzleInput) {
    // Read file
    var input = fs.readFileSync(puzzleInput, 'utf-8');
    // Parse every line into array object 'reports'
    var reports = input
        .split('\n')
        .filter(function (line) { return line.trim() !== ''; })
        .map(function (line) { return line
        .split(/\s+/)
        .filter(function (num) { return num.trim() !== ''; })
        .map(function (num) { return parseInt(num, 10); }); });
    return reports;
}
/** TODO
 * Evaluates if a single report is safe or unsafe.
 * @param report
 * @returns boolean — true if safe, false if unsafe.
 */
function isSafe(report) {
    var isSafe = false;
    var badLevel = 0;
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
        else if ((report[j] < report[j + 1]) && ((report[j + 1] > report[j + 2]))) {
            break;
        }
        // If levels decrease then increase =>
        else if ((report[j] > report[j + 1]) && ((report[j + 1] < report[j + 2]))) {
            break;
        }
        // If it passes the above conditions, guess it must be SAFE
        else {
            isSafe = true;
        }
    }
    return isSafe;
}
/**
 * Evaluates all reports in a list of reports
 * @param reports number[][]
 * @returns safeReportCount — # of safe reports.
 */
function evaluateReports(reports) {
    var safeReportCount = 0;
    // For every report
    for (var i = 0; i < reports.length; i++) {
        var report = reports[i];
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
var inputFilePath = './input.txt';
var reports = parseInput('./input.txt');
var numSafeReports = evaluateReports(reports);
// Print number of safe reports.
console.log('Safe Reports:', numSafeReports);
