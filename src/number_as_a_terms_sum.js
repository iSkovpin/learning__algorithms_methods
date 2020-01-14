/**
 * @param {number} n
 * @returns {Array<number>}
 */
function calculateSumOfTerms(n) {
    let terms = [];
    let term = 1;
    let termsSum = 0;

    while (termsSum <= n) {
        terms.push(term);
        termsSum += term;
        term++;
    }

    let overTerm = terms.pop();
    let lastTerm = overTerm - 1;
    let lastTermsSum = termsSum - overTerm;

    if (lastTermsSum === n) {
        return terms;
    }

    terms.pop();
    terms.push(lastTerm + (n - lastTermsSum));
    return terms;
}

/**
 * IO section.
 * Expected input example: '35'.
 */
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (data) {
    const n = parseInt(data);
    const terms = calculateSumOfTerms(n);
    process.stdout.write(terms.length.toString() + '\n');
    terms.forEach(term => process.stdout.write(term.toString() + ' '));
});
