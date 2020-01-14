/*
 * По данному числу 1 <= n <= 10^9 найдите максимальное число k,
 * для которого n можно представить как сумму k различных натуральных слагаемых.
 * Выведите в первой строке число k, во второй — k слагаемых.
 * link: https://stepik.org/lesson/13238/step/11
 */

/**
 * @param {number} n
 * @returns {Array<number>}
 */
function findNaturalTermsArray(n) {
    let term = 1;
    let terms = [];

    while (term * 2 < n) {
        terms.push(term);
        n -= term;
        term++;
    }

    terms.push(n);
    return terms;
}

/**
 * IO section.
 * Expected input example: '35'.
 */
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (data) {
    const n = parseInt(data);
    const terms = findNaturalTermsArray(n);
    process.stdout.write(terms.length.toString() + '\n');
    terms.forEach(term => process.stdout.write(term.toString() + ' '));
});
