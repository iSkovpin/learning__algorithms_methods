/**
 * @link https://stepik.org/lesson/13257/step/5
 */

/**
 * Find the longest multiple numbers sequence in the array.
 * @param {array} arr
 * @return {number} - sequence length
 */
function findLongestSequence(arr) {
   let seqArr = new Array(arr.length).fill(0);
   let maxSeq = 0;

   for (let i = 0; i < arr.length; ++i) {
       let prevIdx = i;
       for (let j = i - 1; j >= 0; --j) {
           if (arr[i] % arr[j] === 0 && seqArr[prevIdx] < seqArr[j]) {
               prevIdx = j;
               seqArr[i] = seqArr[j] + 1;

               if (seqArr[j] === maxSeq) {
                   break;
               }
           }
       }

       if (seqArr[i] === 0) {
           seqArr[i] = 1;
       }

       if (seqArr[i] > maxSeq) {
           maxSeq = seqArr[i];
       }
   }

   // console.log(arr);
   // console.log(seqArr);

    return maxSeq;
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
        arrLength = parseInt(strings[0]),
        array = strings[1].split(' ').map(val => parseInt(val));

    return findLongestSequence(array).toString();
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
 *
 * Sample Input:
 * 4
 * 3 6 7 12
 *
 * Sample Output:
 * 3
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
