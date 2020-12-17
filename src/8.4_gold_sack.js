/**
 * @link https://stepik.org/lesson/13259/step/5
 */

/**
 * @param {number} sackCapacity
 * @param {number} ingotsNum
 * @param {number[]} ingotsWeights
 * @return {number}
 */
function calculateMaxSackWeight(sackCapacity, ingotsNum, ingotsWeights) {
    let table = [];

    for (let i = 0; i <= ingotsNum; i++) {
        table[i] = [0];
    }

    for (let i = 0; i <= sackCapacity; i++) {
        table[0][i] = 0;
    }

    for (let num = 1; num <= ingotsNum; num++) {
        for (let capacity = 1; capacity <= sackCapacity; capacity++) {
            if (ingotsWeights[num - 1] <= capacity) {
                table[num][capacity] = Math.max(table[num - 1][capacity], table[num - 1][capacity - ingotsWeights[num - 1]] + ingotsWeights[num - 1])
            } else {
                table[num][capacity] = table[num - 1][capacity];
            }
        }
    }

    return table[ingotsNum][sackCapacity];
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
    let [sackCapacity, ingotsNum] = strings[0].split(' ').map(value => parseInt(value));
    let ingotsWeights = strings[1].split(' ').map(value => parseInt(value));

    return calculateMaxSackWeight(sackCapacity, ingotsNum, ingotsWeights).toString();
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
 * 10 3
 * 1 4 8
 *
 * Sample Output:
 * 9
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
