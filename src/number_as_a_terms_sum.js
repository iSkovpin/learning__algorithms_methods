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
