/**
 * @link https://stepik.org/lesson/13262/step/5
 */

/**
 * @param {number} result
 * @return {number[]}
 */
function getCalcSteps(result) {
    let minSteps = getMinCalcSteps(result);
    // console.log(minSteps);
    return restoreCalcSteps(result, minSteps);
}

/**
 * @param {number} maxValue
 * @return {number[]}
 */
function getMinCalcSteps(maxValue) {
    let minSteps = [0, 1, 1];

    for (let value = 4; value <= maxValue; value++) {
        let prevValue = getPrevCalcStep(value, minSteps);
        // console.log('v: ' + value + ' pv: ' + prevValue[0] + ' pvs: ' +  prevValue[1] + ' vs: ' + (prevValue[1] + 1));
        minSteps.push(prevValue[1] + 1);
    }

    return minSteps;
}

/**
 * @param {number} value
 * @param {number[]} minSteps
 * @return {number[]}
 */
function restoreCalcSteps(value, minSteps) {
    let stepResults = [];
    let stepResult = value;

    while (stepResult > 1) {
        let prevValue = getPrevCalcStep(stepResult, minSteps);
        stepResults.push(stepResult);
        stepResult = prevValue[0];
    }

    stepResults.push(stepResult);
    return stepResults.reverse();
}

/**
 * @param {number} value
 * @param {number[]} minSteps
 * @return {number[]}
 */
function getPrevCalcStep(value, minSteps) {
    let prevValueCandidates = [];

    let prevValueCandidate = value - 1;
    prevValueCandidates.push([prevValueCandidate, minSteps[prevValueCandidate - 1]]);

    if (value % 3 === 0) {
        prevValueCandidate = value / 3;
        prevValueCandidates.push([prevValueCandidate, minSteps[prevValueCandidate - 1]]);
    }

    if (value % 2 === 0) {
        prevValueCandidate = value / 2;
        prevValueCandidates.push([prevValueCandidate, minSteps[prevValueCandidate - 1]]);
    }

    prevValueCandidates.sort((a, b) => a[1] - b[1]);
    // console.log(value, prevValueCandidates, minSteps);
    return prevValueCandidates[0];
}

/**
 * RUN!
 * @param {string} input
 * @return {string}
 */
function run(input) {
    if (typeof input !== 'string') {
        return;
    }

    let calcResult = parseInt(input);
    let calcSteps = getCalcSteps(calcResult);
    let stepsNum = calcSteps.length - 1;

    return stepsNum.toString() + "\n" + calcSteps.join(' ');
}

/**
 * Tests section.
 * Add argument 'test' for start testing.
 * Add test names as arguments to run only specific tests.
 */
let args = process.argv.slice(2);
if (args[0] === 'test') {
    const test = require('./test');
    test.run(__filename, input => run(input), args.slice(1));
}

/**
 * IO section.
 *
 * Sample Input:
 * 5
 *
 * Sample Output:
 * 1 2 4 5
 */
let chunks = [];
process.stdin.setEncoding('utf8');
process.stdin.on('readable', function () {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
        chunks.push(chunk);
    }
});
process.stdin.on('end', function () {
    const input = chunks.join('');
    process.stdout.write(run(input));
});
