'use strict'
const AcceptedColors = require('./accepted_colors')
const convertColor = require("./convert_color");

// ----------------------------- 0 | object color
class AbstractColorObject {
    constructor(data, colotType) {
        Object.assign(this, data)
        if (colotType) {
            Object.defineProperty(this, "colotType", {
                enumerable: false,
                writable: true,
                value: colotType
            });
        }
    }

    get hex() {
        return convertColor.convert({
            from: this.colotType,
            to: 'hex6',
            color: this,
            pretty: true,
        })
    }

    get clean() {
        let keys = Object.keys(this).join('')
        let values = Object.values(this).map(x => Math.round(x * 100) / 100).join(', ')
        return `${keys}(${values})`
    }
}

class AbstractColorRAL extends AbstractColorObject {
    constructor(data, colotType) {
        super(data)
    }

    get hex() {
        return convertColor.convert({
            from: 'ral',
            to: 'hex6',
            color: this.ral.toString(),
            pretty: true,
        })
    }

    get clean() {
        const { ral } = this
        return `RAL ${ral}`
    }
}

// ----------------------------- 1 | string color
class AbstractColorString extends String {
    constructor(data, colotType) {
        super(data)
        if (colotType) {
            Object.defineProperty(this, "colotType", {
                enumerable: false,
                writable: true,
                value: colotType
            });
        }
    }

    get hex() {
        return convertColor.convert({
            from: this.colotType,
            to: 'hex6',
            color: this.toString(),
            pretty: true,
        })
    }

    get clean() {
        let _this = this.toString().replace(/([A-Z])/g, ' $1').replace(/ {2}|   {2}/g, ' ').trim()
        return _this.charAt(0).toUpperCase() + _this.slice(1)
    }
}

class AbstractColorStringRAL extends String {
    constructor(data, colotType) {
        super(data)
        if (colotType) {
            Object.defineProperty(this, "colotType", {
                enumerable: false,
                writable: true,
                value: colotType
            });
        }
    }

    get hex() {
        return convertColor.convert({
            from: this.colotType,
            to: 'hex6',
            color: this.toString(),
            pretty: true,
        })
    }

    get clean() {
        return `RAL ${this}`
    }
}

class AbstractColorHTML extends AbstractColorString {
    constructor(data, colotType) {
        super(data)
    }

    get hex() {
        return convertColor.convert({
            from: 'html',
            to: 'hex6',
            color: this.toString(),
            pretty: true,
        })
    }
}

class AbstractColorHex extends AbstractColorString {
    constructor(data, colotType) {
        super(data)
    }

    get hex() {
        return convertColor.convert({
            from: 'hex' + this.length,
            to: 'hex6',
            color: this.toString(),
            pretty: true,
        })
    }

    get clean() {
        return `#${this}`
    }
}

// ----------------------------- 2 | numeric color
class AbstractColorNumber extends Number {
    constructor(data, colotType) {
        super(data)
    }
}

class AbstractColorPantone extends AbstractColorNumber {
    constructor(data, colotType) {
        super(data)
    }

    get hex() {
        return convertColor.convert({
            from: 'pantone',
            to: 'hex6',
            color: this.toString(),
            pretty: true,
        })
    }

    get clean() {
        return `Pantone ${this}`
    }
}

class AbstractColorGrayscale extends AbstractColorNumber {
    constructor(data, colotType) {
        super(data)
    }

    get hex() {
        return convertColor.convert({
            from: 'grayscale',
            to: 'hex6',
            color: this,
            pretty: true,
        })
    }

    get clean() {
        return `Grayscale: ${this}`
    }
}

module.exports = {
    clone: function (data) {
        if (typeof data === "object") {
            return JSON.parse(JSON.stringify(data))
        } else {
            return data
        }
    },

    segments: function({startPoint,endpoint, segments, notIncludeStart = false, notIncludeEnd = false}) {
        const totalSize = endpoint - startPoint
        const segmentsArray = []
        const segmentSize = totalSize/segments


        for(let i = (notIncludeStart)? 1: 0 ; i <= ((notIncludeEnd)? segments -1: segments); i++) {
            segmentsArray.push((segmentSize*i) + startPoint)
        }
        
        return segmentsArray
    },

    hslCircle: function (value){
        if(value < 0){
          return Math.abs(360+value)%360
        } else {
          return (value)%360
        }
    },

    hslSegment: function ({ hue, segments, offset = 0 }) {
        const arcSize = (360 / segments)
        return this.hslCircle((Math.round((hue - offset) / arcSize ) * arcSize ) + offset)
    },

    customColorObject: function ({ colorData, typeOfColor }) {
        if (typeof colorData === 'string') {
            if (typeOfColor === 'html') {
                return new AbstractColorHTML(colorData, typeOfColor)
            } else if (typeOfColor.indexOf('hex') > -1) {
                return new AbstractColorHex(colorData, typeOfColor)
            } else if (typeOfColor === 'ral') {
                return new AbstractColorStringRAL(colorData, typeOfColor)
            }
            return new AbstractColorString(colorData, typeOfColor)
        } else if (typeof colorData === 'number') {
            if (typeOfColor === 'pantone') {
                return new AbstractColorPantone(colorData, typeOfColor)
            } else if (typeOfColor === 'grayscale') {
                return new AbstractColorGrayscale(colorData, typeOfColor)
            }
        } else if (typeof colorData === 'object') {
            if (typeOfColor === 'ral') {

                return new AbstractColorRAL(colorData, typeOfColor)
            }
            return new AbstractColorObject(colorData, typeOfColor)
        } else {
            return colorData
        }
    },

    get acceptedColors() {
        return new AcceptedColors()
    }
}