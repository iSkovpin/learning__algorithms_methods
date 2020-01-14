/*
 * Task: cover a set of segments with a minimal amount of dots. Points must be placed on every segment.
 * Use a greedy algorithm.
 */

/**
 * @param segments {Array<Array>}
 * @returns {Array<number>} of dots
 */
function findCoveringDots(segments) {
    segments.sort(function (a, b) {
        return a[1] - b[1];
    });

    let dots = [];

    for (let i = 0; i < segments.length; i++) {
        let currentSegment = segments[i];
        let point = currentSegment[1];
        dots.push(point);

        while (segments[i + 1] !== undefined && segments[i + 1][0] <= point) {
            i++;
        }
    }

    return dots;
}

/**
 * IO section.
 * Expected input example: '2 \n1 3\n3 4'.
 */
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (data) {
    if (typeof data !== 'string') {
        return;
    }

    const strings = data.split('\n');
    const nSegments = parseInt(strings[0]);
    let segments = [];
    for (let i = 1; i <= nSegments; i++) {
        segments.push(strings[i].split(' ').map(val => parseInt(val)));
    }

    const dots = findCoveringDots(segments);

    process.stdout.write(dots.length.toString() + "\n");
    dots.forEach(function (point) {
        process.stdout.write(point.toString() + ' ');
    });
});
