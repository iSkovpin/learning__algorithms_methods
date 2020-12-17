/**
 * @link https://stepik.org/lesson/13262/step/4
 */

/**
 * @param {number} stairsNum
 * @param {number[]} stairCosts
 * @return {number}
 */
function calculateMaxStairwaySum(stairsNum, stairCosts) {
    if (stairsNum === 1) {
        return stairCosts[0];
    }

    // Note: Memory usage can be optimized if store only two previous max values
    let maxSum = [];
    maxSum[0] = stairCosts[0];
    maxSum[1] = Math.max(stairCosts[0] + stairCosts[1], stairCosts[1]);

    for (let i = 2; i < stairsNum; i++) {
        let prevMax = Math.max(maxSum[i - 1], maxSum[i - 2]);
        maxSum[i] = stairCosts[i] + prevMax;
    }

    // console.log(stairCosts);
    // console.log(maxSum);

    return maxSum[stairsNum - 1];
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

    let strings = input.split('\n');
    let stairsNum = parseInt(strings[0]);
    let stairCosts = strings[1].split(' ').map(value => parseInt(value));

    return calculateMaxStairwaySum(stairsNum, stairCosts).toString();
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
 * 3
 * -1 2 1
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
