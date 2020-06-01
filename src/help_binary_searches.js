/**
 * @param {array} array
 * @param {number} searchValue
 * @returns {number}
 */
function binarySearchEqual(array, searchValue) {
    let left = 0;
    let right = array.length - 1;

    while (right - left > 1) {
        let idx = Math.ceil((left + right) / 2);
        let value = array[idx];

        if (value === searchValue) {
            return idx;
        } else if (searchValue < value) {
            right = idx - 1;
        } else {
            left = idx + 1;
        }
    }

    if (array[left] === searchValue) {
        return left;
    }
    if (array[right] === searchValue) {
        return right;
    }

    return -1;
}

/**
 * @param {array} array
 * @param {number} searchValue
 * @returns {number}
 */
function binarySearchLessOrEqual(array, searchValue) {
    let left = 0;
    let right = array.length - 1;

    let matchedIdx = -1;

    while (right - left > 1) {
        let idx = Math.ceil((left + right) / 2);
        let value = array[idx];

        if (value <= searchValue) {
            matchedIdx = idx;
            left = idx + 1;
        } else {
            right = idx - 1;
        }
    }

    if (array[left] <= searchValue) {
        matchedIdx = left;
    }
    if (array[right] <= searchValue) {
        matchedIdx = right;
    }

    return matchedIdx;
}

/**
 * @param {array} array
 * @param {number} searchValue
 * @returns {number}
 */
function binarySearchLess(array, searchValue) {
    let left = 0;
    let right = array.length - 1;

    let matchedIdx = -1;

    while (right - left > 1) {
        let idx = Math.ceil((left + right) / 2);
        let value = array[idx];

        if (value === searchValue) {
            // matchedIdx = idx;
            right = idx - 1;
        } else if (searchValue < value) {
            right = idx - 1;
        } else if (searchValue > value) {
            matchedIdx = idx;
            left = idx + 1;
        }
    }

    if (array[left] < searchValue) {
        matchedIdx = left;
    }
    if (array[right] < searchValue) {
        matchedIdx = right;
    }

    return matchedIdx;
}

/**
 * @param {array} array
 * @param {number} searchValue
 * @param {string} condition
 * @returns {number}
 */
function binarySearch(array, searchValue, condition = '=') {
    if (condition === '<=') {
        return binarySearchLessOrEqual(array, searchValue);
    } else if (condition === '<') {
        return binarySearchLess(array, searchValue);
    } else {
        return binarySearchEqual(array, searchValue);
    }
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
        condition = strings[0],
        array = strings[1].split(' ').map(val => parseInt(val)),
        arrLength = array.shift(),
        searchValues = strings[2].split(' ').map(val => parseInt(val)),
        searchValuesNumber = searchValues.shift();

    let result = [];

    for (let i = 0; i < searchValues.length; i++) {
        let searchResult = binarySearch(array, searchValues[i], condition);
        if (searchResult !== -1) {
            searchResult++; // count indexes from 1
        }

        result.push(searchResult);
    }

    return result.join(' ');
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
 * Expected input example: '3 1 5 6\n4 5 1 2 99'.
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
