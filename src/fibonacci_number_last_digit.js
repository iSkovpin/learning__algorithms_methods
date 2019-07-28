/**
 * Calculates Fibonacci number last digit by serial number of Fibonacci number.
 * @param {number} n
 * @returns {number}
 */
function getFibonacciNumberLastDigit(n) {
    if (n === 0) {
        return 0;
    } else if (n < 3) {
        return 1;
    }

    let numbersArray = [1, 1, 2];

    for (let i = 4; i <= n; i++) {
        numbersArray.push((numbersArray[1] + numbersArray[2]) % 10);
        // It's not necessary to store all previous numbers.
        numbersArray.shift();
    }

    return numbersArray[2];
}

/**
 * IO section.
 */
process.stdin.setEncoding('utf8');
process.stdin.addListener('data', function (data) {
    if (data === null) {
        return;
    }

    let n = parseInt(data);
    let number = getFibonacciNumberLastDigit(n);

    process.stdout.write(number.toString());
});
