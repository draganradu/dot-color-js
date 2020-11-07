const fs = require('fs');

class _this {
    constructor() {
        this.newline = '\n'
        this.tableDivider = ' | '
        this.output = []

        this.statistics = {
            failed: 0,
            successful: 0,
            timeStart: 0,
            timeEnd: 0,

            get totalTests() {
                return this.successful + this.failed
            }
        }

        this.buildPageStart();
    }

    addLine(a) {
        this.output.push(this.tableDivider + a.join(this.tableDivider) + this.tableDivider + this.newline)
    }

    buildTableHead() {
        this.addLine(["Input value","detect as"])
        this.addLine(["----","----"])
    }

    buildPageStart() {
        this.output.push("# Accepted String Values." + this.newline)
        this.output.push(this.newline) 
    }

    buildFooter() {

    }

    writeFile() {
        fs.writeFile('exemple_color.md', this.output.join(''), (err) => {
            if (err) {
                return console.log(err)
            } else {
                console.log('Color was built -> push me to git -> publish to npm');
                console.log('-----------------------------')
                // console.log(this.output.join(''))
            }

        });
    }
}

module.exports = new _this