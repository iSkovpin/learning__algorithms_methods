module.exports = {
    /**
     * Run tests.
     * @param {string} fileName - absolute file path.
     * @param {callback} runCallback - callback function for testing (input arg required).
     * @param {array} testNames - names of tests which must be done.
     */
    run: function (fileName, runCallback, testNames = []) {
        const fs = require('fs'),
            path = require('path'),
            scriptName = path.basename(fileName, '.js'),
            testsDir = path.dirname(fileName) + '/../testDataSets/' + scriptName + '/input/',
            answersDir = path.dirname(fileName) + '/../testDataSets/' + scriptName + '/output/';

        if (fs.existsSync(testsDir) === false) {
            process.stdout.write(`There is no tests dir for a ${scriptName}\n`);
            process.exit(0);
        }
        if (fs.existsSync(answersDir) === false) {
            process.stdout.write(`There is no answers dir for a ${scriptName}\n`);
            process.exit(0);
        }

        const dir = fs.readdirSync(testsDir);
        if (dir === null) {
            process.stdout.write(`There are no tests for a ${scriptName}\n`);
            process.exit(0);
        }

        dir.forEach(file => {
            const input = fs.readFileSync(testsDir + '/' + file).toString().trim(),
                correctOutput = fs.readFileSync(answersDir + '/' + file).toString().trim(),
                testName = path.basename(file, '.txt');

            if (testNames.length > 0 && testNames.indexOf(testName) === -1) {
                return;
            }

            if (correctOutput === null) {
                process.stdout.write(`Test ${testName} has not answer file\n`);
                return;
            }

            let hrstart = process.hrtime(),
                result;

            try {
                result = runCallback(input).trim();
            } catch (e) {
                process.stdout.write(`Test ${testName} Error: ${e} \n`);
                return;
            }

            let hrend = process.hrtime(hrstart),
                seconds = hrend[0],
                miliseconds = hrend[1] / 1000000;

            if (result === correctOutput) {
                process.stdout.write(`Test ${testName} OK ${seconds}s ${miliseconds}ms \n`);
                return;
            }

            process.stdout.write(`Test ${testName} Failed ${seconds}s ${miliseconds}ms \n`);
        });

        process.exit(0);
    }
};
