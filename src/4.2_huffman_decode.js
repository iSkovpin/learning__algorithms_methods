/*
 * Notice: some of this code can be redundant because a part of this code is from the previous task.
 */

/**
 * A node of a binary tree.
 */
class BinaryTreeNode {
    /**
     * @param {?Letter} value
     * @param {?BinaryTreeNode} childA
     * @param {?BinaryTreeNode} childB
     */
    constructor(value= null, childA = null, childB = null) {
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
        if (value instanceof Letter) {
            value.node = this;
        }
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
     * @param {?number} frequency
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
 * Build a binary tree for Huffman's coding.
 * @param {Object} codes - {a: '00', b: '001', ...}
 * @returns {BinaryTreeNode} - tree root node
 */
function buildHuffmanTreeByCodes(codes) {
    const rootNode = new BinaryTreeNode(new Letter(''));

    for (let letter in codes) {
        let currentNode = rootNode;
        let codeArray = Array.from(codes[letter]);
        let letterObj = new Letter(letter);

        for (let i = 0; i < codeArray.length; i++) {
            let bit = codeArray[i];
            let nodeLetter = i === codeArray.length - 1 ? letterObj : new Letter('');

            if (bit === '0') {
                let childNode = currentNode.childA ? currentNode.childA : new BinaryTreeNode(nodeLetter);
                currentNode.setChildA(childNode);
                currentNode = childNode;
            } else if (bit === '1') {
                let childNode = currentNode.childB ? currentNode.childB : new BinaryTreeNode(nodeLetter);
                currentNode.setChildB(childNode);
                currentNode = childNode;
            }
        }
    }

    return rootNode;
}

/**
 * Decode a string encoded by Huffman's coding.
 * @param {string} string
 * @param {Object} codes - {a: '00', b: '001', ...}
 * @returns {string} - decoded
 */
function decodeString(string, codes) {
    const lettersArray = Array.from(string);
    let decodedString = '';
    let rootNode = buildHuffmanTreeByCodes(codes);

    let currentNode = rootNode;
    for (let i = 0; i < lettersArray.length; i++) {
        let letter = getLetterByCode(lettersArray[i], currentNode);

        if (letter.value === '') {
            currentNode = letter.node;
        } else {
            decodedString += letter.value;
            currentNode = rootNode;
        }
    }

    return decodedString;
}

/**
 * Get a letter by its code using "rootNode" as the root of a Huffman's binary tree.
 * @param {string} code
 * @param {BinaryTreeNode} rootNode
 * @returns {Letter}
 */
function getLetterByCode(code, rootNode) {
    let codeArray = Array.from(code);
    let currentNode = rootNode;

    codeArray.forEach(function (bit) {
        if (bit === '0') {
            currentNode = currentNode.childA;
        } else if (bit === '1') {
            currentNode = currentNode.childB;
        }
    });

    return currentNode.value;
}

/**
 * IO section.
 * Expected input example:
 *    4 14
 *    a: 0
 *    b: 10
 *    c: 110
 *    d: 111
 *    01001100100111
 */
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (data) {
    if (typeof data !== 'string') {
        return;
    }

    const strings = data.split('\n'),
        lettersNumber = strings[0].split(' ')[0],
        encodedString = strings[parseInt(lettersNumber) + 1];

    let codes = {};
    for (let i = 1; i <= lettersNumber; i++) {
        let [letter, code] = strings[i].split(': ');
        codes[letter] = code;
    }

    const decodedString = decodeString(encodedString, codes);

    process.stdout.write(decodedString + '\n');
});
