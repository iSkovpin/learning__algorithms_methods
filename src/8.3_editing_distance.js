/**
 * @link https://stepik.org/lesson/13258/step/8
 */

/**
 * Calculate editing distance between two strings (Levenshtein's algorithm).
 * @param {string} stringA
 * @param {string} stringB
 * @return {number}
 */
function calculateEditingDistance(stringA, stringB) {
    const lengthA = stringA.length;
    const lengthB = stringB.length;

    let arrD = [];

    for (let i = 0; i <= lengthA; ++i) {
        arrD[i] = new Array(lengthB + 1);
        arrD[i][0] = i;
    }
    for (let j = 0; j <= lengthB; ++j) {
        arrD[0][j] = j;
    }

    for (let i = 1; i <= lengthA; ++i) {
        for (let j = 1; j <= lengthB; ++j) {
            let replaceCost = getCharsReplaceCost(stringA.charAt(i - 1), stringB.charAt(j - 1));
            arrD[i][j] = Math.min(arrD[i - 1][j] + 1, arrD[i][j - 1] + 1, arrD[i - 1][j - 1] + replaceCost);
        }
    }

    // debug
    // for (let i = 0; i <= lengthA; ++i) {
    //     console.log(arrD[i]);
    // }

    return arrD[lengthA][lengthB];
}

/**
 * Get the "cost" of changing a charA to a charB.
 * @param {string} charA
 * @param {string} charB
 * @return {number}
 */
function getCharsReplaceCost(charA, charB) {
    if (charA === charB) {
        return 0;
    }
    return 1;
}

/**
 * RUN!
 * @param {string} input
 * @returns {string}
 */
function run(input) {
    if (typeof input !== 'string') {
        return;
    }

    const strings = input.split('\n');
    return calculateEditingDistance(strings[0], strings[1]).toString();
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
 * short
 * ports
 *
 * Sample Output:
 * 3
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
