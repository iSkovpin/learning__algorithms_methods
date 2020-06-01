/**
 * @link https://stepik.org/lesson/13249/step/6
 */

/**
 * Container for an array and related things.
 */
class ArrContainer {
    constructor(array, comparisonFunction) {
        this.array = array;
        this.setComparisonFunction(comparisonFunction);
    }

    getLength() {
        return this.array.length;
    }

    setComparisonFunction(func) {
        this.comparisonFunction = func;
    }

    getComparisonFunction() {
        return this.comparisonFunction;
    }
}

/**
 * @param {ArrContainer} container
 * @param {*} searchValue
 * @returns {number}
 */
function binarySearchLessOrEqual(container, searchValue) {
    let array = container.array;
    let comparisonFunction = container.getComparisonFunction();
    let left = 0;
    let right = array.length - 1;

    let matchedIdx = -1;

    while (right - left > 1) {
        let idx = Math.ceil((left + right) / 2);
        let value = array[idx];

        if (comparisonFunction(value, searchValue) !== 1) {
            matchedIdx = idx;
            left = idx + 1;
        } else {
            right = idx - 1;
        }
    }

    if (comparisonFunction(array[left], searchValue) !== 1) {
        matchedIdx = left;
    }
    if (comparisonFunction(array[right], searchValue) !== 1) {
        matchedIdx = right;
    }

    return matchedIdx;
}

/**
 * @param {ArrContainer} container
 * @param {*} searchValue
 * @returns {number}
 */
function binarySearchLess(container, searchValue) {
    let array = container.array;
    let comparisonFunction = container.getComparisonFunction();
    let left = 0;
    let right = array.length - 1;

    let matchedIdx = -1;

    while (right - left > 1) {
        let idx = Math.ceil((left + right) / 2);
        let value = array[idx];

        if (comparisonFunction(value, searchValue) === 0) {
            right = idx - 1;
        } else if (comparisonFunction(searchValue, value) === -1) {
            right = idx - 1;
        } else if (comparisonFunction(searchValue, value) === 1) {
            matchedIdx = idx;
            left = idx + 1;
        }
    }

    if (comparisonFunction(array[left], searchValue) === -1) {
        matchedIdx = left;
    }
    if (comparisonFunction(array[right], searchValue) === -1) {
        matchedIdx = right;
    }

    return matchedIdx;
}

/**
 * @param {ArrContainer} container
 * @param {*} searchValue
 * @param {string} condition
 * @returns {number}
 */
function binarySearch(container, searchValue, condition) {
    if (condition === '<=') {
        return binarySearchLessOrEqual(container, searchValue);
    } else if (condition === '<') {
        return binarySearchLess(container, searchValue);
    }
}

/**
 * Is array sorted.
 * @param {ArrContainer} container
 * @returns {boolean}
 */
function isSorted(container) {
    const comparisonFunction = container.getComparisonFunction();

    for (let i = 0; i < container.array.length - 1; i++) {
        if (comparisonFunction(container.array[i + 1], container.array[i]) === -1) {
            return false;
        }
    }

    return true;
}

/**
 * Get the index of the median array value.
 * @param {ArrContainer} container
 * @param {number} left
 * @param {number} right
 * @returns {number}
 */
function getMedianIndex(container, left, right) {
    const comparisonFunction = container.getComparisonFunction();

    if (right - left <= 0) {
        return -1;
    } else if (right - left < 3) {
        return left;
    }

    const beginIndex = left;
    const endIndex = right;
    const centerIndex = Math.floor((right - left) / 2);

    const beginElem = [beginIndex, container.array[beginIndex]];
    const centerElem = [centerIndex, container.array[centerIndex]];
    const endElem = [endIndex, container.array[endIndex]];

    let trinity = [beginElem, centerElem, endElem];

    trinity.sort(function (a, b) {
        return comparisonFunction(a[1], b[1]);
    });

    return trinity[1][0];
}

/**
 * Find base index and separate all elements into 2 groups: lesser and greater than base element.
 * @param {ArrContainer} container
 * @param {number} left
 * @param {number} right
 * @returns {number} - index of the base element
 */
function partition(container, left, right) {
    const comparisonFunction = container.getComparisonFunction();

    let changeElements = function (index1, index2) {
        if (index2 === index1) {
            return;
        }

        let temp = container.array[index2];
        container.array[index2] = container.array[index1];
        container.array[index1] = temp;
    };

    const medianIndex = getMedianIndex(container, left, right);
    const medianValue = container.array[medianIndex];

    if (medianIndex !== left) {
        changeElements(left, medianIndex);
    }

    let i = left + 1;
    let j = left;

    for (; i <= right; i++) {
        if (comparisonFunction(container.array[i], medianValue) === 1) {
            continue;
        }

        changeElements(i, j + 1);
        j++;
    }

    let z = j;
    while (z > left && comparisonFunction(container.array[z], medianValue) === 0) {
        z--;
    }

    let k = left + 1;
    for (; z > k; k++) {
        if (comparisonFunction(container.array[k], medianValue) !== 0) {
            continue;
        }

        changeElements(k, z);
        z--;
    }

    changeElements(left, z);

    return [z, j];
}

/**
 * Implementation of quick sorting with separation elements into 3 groups.
 * @param {ArrContainer} container
 * @param {number} left
 * @param {number} right
 */
function quickSort3(container, left, right) {
    if (left >= right) {
        return;
    }

    const baseIndex = partition(container, left, right);
    quickSort3(container, left, baseIndex[0] - 1);
    quickSort3(container, baseIndex[1] + 1, right);
}

/**
 * Count number of segments which contain the dot.
 * @param {ArrContainer} segmentsByLeft - segments array sorted by the left edge
 * @param {ArrContainer} segmentsByRight - segments array sorted by the right edge
 * @param {number} dot
 * @returns {number}
 */
function countSegmentsDotIsBelongTo(segmentsByLeft, segmentsByRight, dot) {
    const dotSegment = [dot, dot];

    const startedBeforeDot = binarySearch(segmentsByLeft, dotSegment, '<=');
    const endedBeforeDot = binarySearch(segmentsByRight, dotSegment, '<');

    return startedBeforeDot - endedBeforeDot;
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
    const [segmentsNumber, dotsNumber] = strings[0].split(' ').map(val => parseInt(val));

    let container = new ArrContainer([]);
    for (let i = 1; i <= segmentsNumber; i++) {
        let segment = strings[i].split(' ').map(val => parseInt(val));
        container.array.push(segment);
    }

    const dots = strings[segmentsNumber + 1].split(' ').map(val => parseInt(val));

    const leftComparison = function (a, b) {
        if (a[0] > b[0]) {
            return 1;
        } else if (a[0] < b[0]) {
            return -1;
        }
        return 0;
    };

    const rightComparison = function (a, b) {
        if (a[1] > b[1]) {
            return 1;
        } else if (a[1] < b[1]) {
            return -1;
        }
        return 0;
    };

    let segmentsByLeft = new ArrContainer([...container.array], leftComparison);
    let segmentsByRight = new ArrContainer([...container.array], rightComparison);

    if (isSorted(segmentsByLeft) === false) {
        quickSort3(segmentsByLeft, 0, segmentsByLeft.getLength() - 1);
    }
    if (isSorted(segmentsByRight) === false) {
        quickSort3(segmentsByRight, 0, segmentsByRight.getLength() - 1);
    }

    let dotInSegments = [];
    for (let dot of dots) {
        dotInSegments.push(countSegmentsDotIsBelongTo(segmentsByLeft, segmentsByRight, dot));
    }

    return dotInSegments.map(val => val.toString()).join(' ');
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
