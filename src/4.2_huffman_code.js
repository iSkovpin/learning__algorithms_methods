/**
 * A node of a binary tree.
 */
class BinaryTreeNode {
    /**
     * @param {Letter} value
     * @param {?BinaryTreeNode} childA
     * @param {?BinaryTreeNode} childB
     */
    constructor(value, childA = null, childB = null) {
        this.setValue(value);
        this.setChildA(childA);
        this.setChildB(childB);
        this.parent = null;
    }

    /**
     * @param {Letter} value
     */
    setValue(value) {
        this.value = value;
        value.node = this;
    }

    setChildA(child) {
        this.childA = child;
        if (child instanceof BinaryTreeNode) {
            child.parent = this;
        }
    }

    setChildB(child) {
        this.childB = child;
        if (child instanceof BinaryTreeNode) {
            child.parent = this;
        }
    }

    getChildren() {
        return [this.childA, this.childB];
    }

    isRoot() {
        return !this.parent;
    }

    isParent() {
        return this.childA !== null || this.childB !== null;
    }

    isLeaf() {
        return !this.isParent();
    }
}

/**
 * Representation of a letter.
 */
class Letter {
    /**
     * @param {string} value
     * @param {number} frequency
     * @param {?BinaryTreeNode} node
     */
    constructor(value, frequency, node = null) {
        this.node = node;
        this.value = value;
        this.frequency = frequency;
    }

    hasNode() {
        return this.node !== null;
    }
}

/**
 * Simple implementation of the priority queue.
 */
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    extractMin() {
        return this.queue.shift().value;
    }

    extractMax() {
        return this.queue.pop().value;
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    getSize() {
        return this.queue.length;
    }

    /**
     * @param element
     * @param {number} priority
     */
    insert(element, priority) {
        const innerElem = {
            priority: priority,
            value: element,
        };

        if (this.queue.length === 0 || innerElem.priority > this.queue[this.queue.length - 1].priority) {
            this.queue.push(innerElem);
            return;
        }

        if (innerElem.priority <= this.queue[0].priority) {
            this.queue.unshift(innerElem);
            return;
        }

        for (let i = 1; i < this.queue.length; i++) {
            if (innerElem.priority <= this.queue[i].priority) {
                this.queue.splice(i, 0, innerElem);
                return;
            }
        }
    }
}

/**
 * Build binary tree for the Huffman code.
 * @param {PriorityQueue} queue of {Letter} - letters priority queue.
 * @returns {BinaryTreeNode} - root node of binary tree.
 */
function buildHuffmanTree(queue) {
    let lastParentNode = null;
    if (queue.getSize() === 1) {
        lastParentNode = new BinaryTreeNode(queue.extractMin());
    }

    while (!queue.isEmpty()) {
        let last = queue.extractMin();
        let preLast = queue.extractMin();

        let lastNode = last.hasNode() ? last.node : new BinaryTreeNode(last);
        let preLastNode = preLast.hasNode() ? preLast.node : new BinaryTreeNode(preLast);

        let pseudoLetter = new Letter('', last.frequency + preLast.frequency);

        lastParentNode = new BinaryTreeNode(pseudoLetter, lastNode, preLastNode);

        if (!queue.isEmpty()) {
            queue.insert(pseudoLetter, pseudoLetter.frequency);
        }
    }

    return lastParentNode;
}

/**
 * Make a priority queue from a letters frequencies array.
 * @param {Object} letterFrequencies - {a: 33, b: 155, c: 1, ...}
 * @returns {PriorityQueue}
 */
function getLetterPriorityQueue(letterFrequencies) {
    let queue = new PriorityQueue();
    for (let letter in letterFrequencies) {
        let letterObj = new Letter(letter, letterFrequencies[letter]);
        queue.insert(letterObj, letterObj.frequency);
    }
    return queue;
}

/**
 * Get a string encoded with the Huffman's algorithm.
 * @param {string} string
 * @param {Object} codes - list of letters codes {a: '001', b: '111', ...}
 * @returns {string}
 */
function getEncodedString(string, codes) {
    let lettersArray = Array.from(string);
    let encodedString = '';

    for (let i = 0; i < lettersArray.length; i++) {
        encodedString += codes[lettersArray[i]];
    }

    return encodedString;
}

/**
 * Get letter codes based on a binary tree.
 * @param {BinaryTreeNode} rootNode of Huffman binary tree
 * @param {Object} codes - list of letters codes {a: '001', b: '111', ...}
 * @param {string} parentCode - code of all parent nodes for recursion
 */
function getLetterCodes(rootNode, codes = {}, parentCode = '') {
    if (rootNode.isRoot() && rootNode.isLeaf()) {
        codes[rootNode.value.value] = parentCode + '0';
        return codes;
    }

    rootNode.getChildren().forEach(function (child, childCode) {
        let code = parentCode + childCode.toString();
        if (child.isLeaf()) {
            let letter = child.value;
            codes[letter.value] = code;
            return;
        }
        getLetterCodes(child, codes, code);
    });

    return codes;
}

/**
 * Get frequencies of all letters in string.
 * @param {string} string
 * @returns {Object} - {a: 33, b: 155, c: 1, ...}
 */
function getLetterFrequencies(string) {
    let result = {};

    if (string.length === 0) {
        return result;
    }

    let lettersArray = Array.from(string);

    for (let i = 0; i < lettersArray.length; i++) {
        result[lettersArray[i]] = result.hasOwnProperty(lettersArray[i]) ? result[lettersArray[i]] + 1 : 1;
    }

    return result;
}

/**
 * IO section.
 * Expected input example: 'abacabad'.
 */
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (data) {
    if (typeof data !== 'string') {
        return;
    }

    const string = data.toString().replace(new RegExp("\\r?\\n", "g"), ""),
        lettersFrequency = getLetterFrequencies(string),
        queue = getLetterPriorityQueue(lettersFrequency),
        treeRootNode = buildHuffmanTree(queue),
        letterCodes = getLetterCodes(treeRootNode),
        encodedString = getEncodedString(string, letterCodes),
        encodedStringLength = encodedString.length,
        lettersNumber = Object.keys(letterCodes).length;

    process.stdout.write(lettersNumber.toString() + ' ' + encodedStringLength.toString() + '\n');
    for (let letter in letterCodes) {
        process.stdout.write(letter + ': ' + letterCodes[letter].toString() + '\n');
    }
    process.stdout.write(encodedString + '\n');
});
