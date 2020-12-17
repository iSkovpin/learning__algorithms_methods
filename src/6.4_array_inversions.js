/**
 * @link https://stepik.org/lesson/13248/step/5
 */

let inversionsCount = 0;

/**
 * Merge two arrays and sort them ascending.
 * Merging arrays also must be sorted ascending.
 * Affecting global var "inversionsCount"
 * @param {Array} arr1
 * @param {Array} arr2
 */
function merge(arr1, arr2) {
    const arr1length = arr1.length,
        arr2length = arr2.length;
    let arr1pointer = 0,
        arr2pointer = 0,
        result = [];

    while (arr1length - arr1pointer > 0 && arr2length - arr2pointer > 0) {
        if (arr1[arr1pointer] <= arr2[arr2pointer]) {
            result.push(arr1[arr1pointer]);
            arr1pointer++;
            continue;
        }

        result.push(arr2[arr2pointer]);
        arr2pointer++;
        inversionsCount += arr1length - arr1pointer;
    }

    for (; arr1length - arr1pointer > 0; arr1pointer++) {
        result.push(arr1[arr1pointer]);
    }

    for (; arr2length - arr2pointer > 0; arr2pointer++) {
        result.push(arr2[arr2pointer]);
    }

    return result;
}

/**
 * Sort array of integer numbers ascending using iterative merging method.
 * @param {Array} arr
 * @returns {Array}
 */
function mergingSort(arr) {
    let tmpArr1 = [],
        tmpArr2 = [];

    while (arr.length > 0) {
        tmpArr1.push([arr.pop()]);
    }

    while (!(tmpArr1.length === 0 && tmpArr2.length === 1)) {
        if (tmpArr1.length > 1) {
            tmpArr2.push(merge(tmpArr1.pop(), tmpArr1.pop()));
            continue;
        }

        if (tmpArr1.length === 1) {
            tmpArr2.push(tmpArr1.pop());
        }

        if (tmpArr1.length === 0) {
            tmpArr1 = tmpArr2.reverse();
            tmpArr2 = [];
        }
    }

    return tmpArr2[0];
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
        array = strings[1].split(' ').map(val => parseInt(val));

    inversionsCount = 0;
    mergingSort(array);

    return inversionsCount.toString();
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
 * Expected input example: '5\n2 3 9 2 9'.
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
