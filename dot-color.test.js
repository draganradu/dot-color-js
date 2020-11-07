const dotColor = require('./dot-color')
const testData = require('./test/test.data')
const testApp = new dotColor('')


for(const i of testData) {
    testApp.color = i[0]
    for ( const a in i[1]) {
        const t = (testApp[a] instanceof String)?testApp[a].toString() : testApp[a]
        const d = i[1][a]
        test([a,JSON.stringify(i[0]), JSON.stringify(t)].join(' | '), () => {
            expect(t).toEqual(d)
        })
    }

}