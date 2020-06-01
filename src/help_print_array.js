let args = process.argv.slice(2);
let n = parseInt(args[0]);

if (args[1]) {
    const val = args[1];

    for (let i = 0; i < n; i++) {
        process.stdout.write(val + ' ');
    }
} else {
    process.stdout.write([...Array(n).keys()].join(' '));
}

// for (let i = -24999; i <= 25000; i++) {
//     process.stdout.write('1' + ' ');
// }
