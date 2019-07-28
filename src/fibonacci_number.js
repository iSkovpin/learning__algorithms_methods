/**
 * Calculate Fibonacci number by its serial number.
 * @param {number} n
 * @returns {number}
 */
function getFibonacciNumber(n) {
    if (n === 0) {
        return 0;
    } else if (n < 3) {
        return 1;
    }

    let numbersArray = [1, 1, 2];

    for (let i = 4; i <= n; i++) {
        numbersArray.push(numbersArray[1] + numbersArray[2]);
        // It's not necessary to store all previous numbers.
        numbersArray.shift();
    }

    return numbersArray[2];
}

/**
 * IO section.
 * Expected input example: '35'.
 */
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (data) {
    const n = parseInt(data);
    const number = getFibonacciNumber(n);
    process.stdout.write(number.toString());
});
