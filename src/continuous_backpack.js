/*
 * Task: find the maximum cost of things which can be placed into a backpack. Things can be cut.
 * Use a greedy algorithm.
 * See: https://stepik.org/lesson/13238/step/10
 */

/**
 * @param backpackVolume {number}
 * @param things {Array<Array>} - [[cost1, volume2], [cost2, volume2], ...]
 * @returns {number}
 */
function calculateMaxCost(backpackVolume, things) {
    things.sort((a, b) => b[0] / b[1] - a[0] / a[1]);

    let cost = 0;
    let i = 0;
    while (things[i][1] <= backpackVolume) {
        cost += things[i][0];
        backpackVolume -= things[i][1];
        i++;

        if (things[i] === undefined) {
            return cost;
        }
    }

    cost += backpackVolume / things[i][1] * things[i][0];
    return cost;
}

/**
 * IO section.
 * Expected input example: '2 50\n60 20\n30 43'.
 */
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (data) {
    if (typeof data !== 'string') {
        return;
    }

    const strings = data.split('\n');
    const [thingsNumber, backpackVolume] = strings[0].split(' ').map(val => parseInt(val));
    let things = [];
    for (let i = 1; i <= thingsNumber; i++) {
        things.push(strings[i].split(' ').map(val => parseInt(val)));
    }

    const cost = calculateMaxCost(backpackVolume, things);

    process.stdout.write(cost.toFixed(3));
});
