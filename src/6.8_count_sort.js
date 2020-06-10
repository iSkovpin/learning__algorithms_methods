/**
 * @link https://stepik.org/lesson/13252/step/2
 */

/**
 * Counting sorting.
 * Fast sorting of arrays with small different integer values (1..10 etc).
 * @param {array} srcArr
 * @param {number} nMax - max integer value
 * @returns {array}
 */
function countSort(srcArr, nMax) {
    let countArr = new Array(nMax + 1).fill(0);
    let sortedArr = [];

    for (let j = 0; j < srcArr.length; ++j) {
        countArr[srcArr[j]]++;
    }

    for (let i = 1; i < countArr.length; ++i) {
        countArr[i] = countArr[i] + countArr[i - 1];
    }

    for (let l = srcArr.length - 1; l >= 0; --l) {
        sortedArr[countArr[srcArr[l]] - 1] = srcArr[l];
        countArr[srcArr[l]]--;
    }

    return sortedArr;
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

    const strings = input.split('\n'),
        arrLength = parseInt(strings[0]),
        array = strings[1].split(' ').map(val => parseInt(val));

    return countSort(array, 10).map(val => val.toString()).join(' ');
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
 * 2 3 9 2 9
 *
 * Sample Output:
 * 2 2 3 9 9
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
