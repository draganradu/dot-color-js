
const objectiveColor = require('../dot-color')
const testData = require('./test.data')
const testRules = require('./test.rules')

const colorTest = new objectiveColor()

testRules.buildTableHead()

for (const elementColor of testData) {
    if (typeof elementColor[0] === 'string') {
        // set color
        colorTest.colorExtractor(elementColor[0])
        // read

        let testPassed = true
        for (const testValue in elementColor[1]) {
            // convert data to a die cast model
            
            let die = ''
            let cast = ''

            if (typeof elementColor[1][testValue] === 'object') {
                die = Object.entries(elementColor[1][testValue]).sort().toString()
                cast = Object.entries(colorTest[testValue]).sort().toString()
            } else {
                die = elementColor[1][testValue]
                cast = colorTest[testValue]
            }

            // see if the testing is correct
            if (die === cast || die === cast.toString(2)) {
                testRules.addLine([elementColor[0], testValue + ": " + die])
            } else {
                testPassed = false
                console.log('failed on:' + (testRules.statistics.totalTests + 2), die, cast ,'---------------------------------------')
            }
        }

        if (testPassed) {
            testRules.statistics.successful++;
        } else {
            testRules.statistics.failed++;
        }
    }
}

console.log(testRules.statistics)
testRules.writeFile()
