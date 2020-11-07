

const colorAbstract = require('../dot-color')

const color = new colorAbstract('cmyk 10 20 50 10')
console.log(color.compare('cmyk 60 20 50 10', 'cmyk 20 20 50 10', 'cmyk 1 20 50 10')) 

/*

[ { ral: 1006, name: 'Maize Yellow', lrv: 36 },
  { ral: 1000, name: 'Green Beige', lrv: 50 },
  { ral: 6019, name: 'Pastel Green', lrv: 57 } ]

*/


