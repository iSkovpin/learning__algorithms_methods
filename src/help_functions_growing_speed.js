/**
 * Calculates functions values when x = n.
 * ! This shit doesn't work because of extra large values restrictions in JS. But it is still could be useful.
 * @param {number} n
 * @returns {array}
 */
function getFunctionsOrderedByValue(n) {
    let funcs = [
        {
            callback: function (n) {
                return Math.sqrt(basedLog(4, n))
            },
            name: 'sqrt(log(4,x))',
            value: 0
        },
        {
            callback: function (n) {
                return Math.log2(Math.log2(n));
            },
            name: 'log(2,log(2,x))',
            value: 0
        },
        {
            callback: function (n) {
                return basedLog(3, n)
            },
            name: 'log(3,x)',
            value: 0
        },
        {
            callback: function (n) {
                return n / basedLog(5, n);
            },
            name: '(x)/(log(5,x))',
            value: 0
        },
        {
            callback: function (n) {
                return Math.sqrt(n);
            },
            name: 'sqrt(x)',
            value: 0
        },
        {
            callback: function (n) {
                return Math.log2(n) * Math.log2(n);
            },
            name: 'log(2,x)^(2)',
            value: 0
        },
        {
            callback: function (n) {
                return Math.log2(factorial(n));
            },
            name: 'log(2,x!)',
            value: 0
        },
        {
            callback: function (n) {
                return Math.pow(3, Math.log2(n));
            },
            name: '3^(log(2,x))',
            value: 0
        },
        {
            callback: function (n) {
                return n * n;
            },
            name: 'x^2',
            value: 0
        },
        {
            callback: function (n) {
                return Math.pow(Math.log2(n), Math.log2(n));
            },
            name: 'log(2,x)^(log(2,x))',
            value: 0
        },
        {
            callback: function (n) {
                return Math.pow(7, Math.log2(n));
            },
            name: '7^(log(2,x))',
            value: 0
        },
        {
            callback: function (n) {
                return Math.pow(n, Math.log2(n));
            },
            name: 'x^(log(2,x))',
            value: 0
        },
        {
            callback: function (n) {
                return Math.pow(n, Math.sqrt(n));
            },
            name: 'x^(sqrt(x))',
            value: 0
        },
        {
            callback: function (n) {
                return Math.pow(2, n);
            },
            name: '2^n',
            value: 0
        },
        {
            callback: function (n) {
                return Math.pow(4, n);
            },
            name: '4^n',
            value: 0
        },
        {
            callback: function (n) {
                return Math.pow(2, 3 * n);
            },
            name: '2^(3*n)',
            value: 0
        },
        {
            callback: function (n) {
                return factorial(n);
            },
            name: 'n!',
            value: 0
        },
        {
            callback: function (n) {
                return Math.pow(2, Math.pow(2, n));
            },
            name: '2^(2^(x))',
            value: 0
        },
    ];

    funcs.forEach(function (elem) {
        elem.value = elem.callback(n);
    });

    funcs.sort(function (a, b) {
        return a.value - b.value;
    });

    return funcs;
}

function basedLog(b, x) {
    return Math.log(x) / Math.log(b);
}

function factorial(n) {
    return (n !== 1) ? n * factorial(n - 1) : 1;
}

/**
 * IO section.
 * Expected input example: '35'.
 */
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (data) {
    const n = parseInt(data);
    let funcs = getFunctionsOrderedByValue(n);

    let i = 1;
    funcs.forEach(function (elem) {
        let n = i++;
        process.stdout.write(n.toString() + "\n");
        process.stdout.write(elem.name + "\n");
        process.stdout.write(elem.value.toString() + "\n");
        process.stdout.write("\n");
    });
});
