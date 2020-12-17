/**
 * @link https://stepik.org/lesson/13240/step/8
 */

/**
 * Priority queue based on a min heap (min value in the root of the heap tree).
 * Args in methods: it - iterator (identifier of some element in the heap), p - priority.
 */
class PriorityQueueMin {
    constructor() {
        this.heap = [];
    }

    checkIt(it) {
        if (it >= this.heap.length) {
            throw new Error('Iterator ' + it + ' is out of range');
        }
    }

    isRoot(it) {
        return it === 0;
    }

    isLeaf(it) {
        return this.getChildrenIt(it).length === 0;
    }

    siftUp(it) {
        if (this.isRoot(it)) {
            return;
        }

        let elemIt = it;
        let elemPriority = this.getPriority(elemIt);
        let parentIt = this.getParentIt(elemIt);
        let parentPriority = this.getPriority(parentIt);

        while (elemPriority < parentPriority) {
            this.heap[parentIt] = elemPriority;
            this.heap[elemIt] = parentPriority;

            elemIt = parentIt;
            elemPriority = this.getPriority(elemIt);

            if (this.isRoot(elemIt)) {
                break;
            }

            parentIt = this.getParentIt(elemIt);
            parentPriority = this.getPriority(parentIt);
        }
    }

    siftDown(it) {
        if (this.isLeaf(it)) {
            return;
        }

        let elemIt = it;
        let elemPriority = this.getPriority(elemIt);
        let minChildIt = this.getMinChildIt(it);
        let minChildPriority = this.getPriority(minChildIt);

        while (elemPriority > minChildPriority) {
            this.heap[minChildIt] = elemPriority;
            this.heap[elemIt] = minChildPriority;

            elemIt = minChildIt;
            elemPriority = this.getPriority(elemIt);

            if (this.isLeaf(elemIt)) {
                break;
            }

            minChildIt = this.getMinChildIt(elemIt);
            minChildPriority = this.getPriority(minChildIt);
        }
    }

    siftAuto(it) {
        if (!this.isRoot(it) && this.getPriority(it) > this.getPriority(this.getParentIt(it))) {
            this.siftUp(it);
            return;
        }

        this.siftDown(it);
    }

    getPriority(it) {
        this.checkIt(it);
        return this.heap[it];
    }

    getParentIt(it) {
        this.checkIt(it);
        return Math.floor((it - 1) / 2);
    }

    getNextIt() {
        return this.heap.length;
    }

    getLastIt() {
        return this.heap.length - 1;
    }

    changeIt(it1, it2) {
        const priority1 = this.getPriority(it1);

        this.heap[it1] = this.getPriority(it2);
        this.heap[it2] = priority1;
    }

    getChildrenIt(it) {
        const childA = it * 2 + 1;
        if (childA >= this.heap.length) {
            return [];
        }

        const childB = childA + 1;
        if (childB >= this.heap.length) {
            return [childA];
        }

        return [childA, childB];
    }

    getMinChildIt(it) {
        let map = {};
        const childrenIt = this.getChildrenIt(it);
        const priorities = childrenIt.map(it => this.getPriority(it));

        for (let i = 0; i < childrenIt.length; i++) {
            map[childrenIt[i]] = priorities[i];
        }

        const minPriority = Math.min(...priorities);
        return parseInt(Object.keys(map).find(key => map[key] === minPriority));
    }

    /*
     * Public interface
     */

    /**
     * Insert element with priority "p".
     * @param p
     */
    insert(p) {
        this.heap.push(p);
        this.siftUp(this.heap.length - 1);
    }

    /**
     * Remove element with iterator "it".
     * @param {number} it
     * @returns {number}
     */
    remove(it) {
        this.changeIt(it, this.getLastIt());
        const priority = this.heap.pop();
        this.siftAuto(it);
        return priority;
    }

    /**
     * Returns minimum priority in the queue.
     * @returns {number}
     */
    getMin() {
        return this.heap[0];
    }

    /**
     * Extracts an element with minimum priority and return its priority.
     * @returns {number}
     */
    extractMin() {
        return this.remove(0);
    }

    /**
     * Change priority of the element by iterator "it" to the new value "p".
     * @param {number} it
     * @param {number} p
     */
    changePriority(it, p) {
        this.checkIt(it);
        this.heap[it] = p;
        this.siftAuto(it);
    }
}

/**
 * Priority queue based on a max heap (max value in the root of the heap tree).
 * Args in methods: it - iterator (identifier of some element in the heap), p - priority.
 */
class PriorityQueueMax extends PriorityQueueMin {
    insert(p) {
        super.insert(p * -1);
    }

    getMin() {
        throw new Error('Method is not supported');
    }

    extractMin() {
        throw new Error('Method is not supported');
    }

    getMax() {
        return super.getMin() * -1;
    }

    extractMax() {
        return super.extractMin() * -1;
    }
}

function run(input) {
    const strings = input.split('\n'),
        commandsNumber = parseInt(strings[0]);

    let queue = new PriorityQueueMax(),
        result = '';

    for (let i = 1; i <= commandsNumber; i++) {
        if (strings[i] === undefined || strings[i].trim().length === 0) {
            break;
        }

        let [command, value] = strings[i].split(' ');

        if (command === 'Insert') {
            queue.insert(parseInt(value));
            continue;
        } else if (command === 'ExtractMax') {
            result += queue.extractMax().toString() + "\n";
            continue;
        }

        throw new Error('Unknown command: ' + command);
    }

    return result;
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
 * Expected input example:
 *   6
 *   Insert 200
 *   Insert 10
 *   ExtractMax
 *   Insert 5
 *   Insert 500
 *   ExtractMax
 */
let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('readable', function () {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
        input += chunk;
    }
});
process.stdin.on('end', function () {
    process.stdout.write(run(input));
});
