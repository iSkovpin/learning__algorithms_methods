/**
 * @link https://stepik.org/lesson/13229/step/5
 */

/**
 * Calculate greater common divisor of two numbers using Euclid algorithm.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function getGreatestCommonDivisor(a, b) {
    if (a === 0) {
        return b;
    } else if (b === 0) {
        return a;
    } else if (a === b) {
        return a;
    }

    if (a > b) {
        return getGreatestCommonDivisor(a % b, b);
    } else if (a < b) {
        return getGreatestCommonDivisor(b % a, a);
    }
}

/**
 * IO section.
 * Expected input example: '345345 4353453'.
 */
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (data) {
    const [a, b] = data.split(' ').map(val => parseInt(val));
    const result = getGreatestCommonDivisor(a, b);
    process.stdout.write(result.toString());
});
