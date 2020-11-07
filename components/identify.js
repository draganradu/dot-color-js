'use strict'
// const { html, pantone, ral } = require('color_library')
const AcceptedColors = require("./accepted_colors")
const sanitizer = require("./sanitization")
const convertColor = require("./convert_color")

class abstractColor {
    constructor() {
        this.exclusionRegex = {
            cmyk: /hex/g,
            hex: /(?![hxo])[g-z]|([0-9]\w)\s([0-9]\w)\s([0-9]\w)/ig,
            grayscale: /#|pantone/g,
            pantone: /w|rgb|ral/ig,
            rgb: /xyz|lab|hsl|yuv/g,
        }
    }

    abstractMakeInt(a, b = 100) {
        if (typeof a === 'string') {
            let aClean = parseFloat(a.replace(/[^0-9,.]/g, ''))

            if (a.indexOf('%') > -1) {
                return (aClean / 100) * b
            }
            if (parseFloat(aClean) < 1) {
                return aClean
            }
            return aClean
        }

        return isNaN(a) ? false : a
    }

    procentRequire(number1, number2) {
        if (number1 > 1 && number2 > 1) {
            return false
        } else {
            return true
        }
    }

    exclude(colorVal, colorName) {
        switch (colorName) {
            case "cmyk":
                return (colorVal.match(this.exclusionRegex.cmyk)) ? false : true
            case "hex3":
            case "hex4":
            case "hex6":
            case "hex8":
                return (colorVal.match(this.exclusionRegex.hex)) ? false : true
            case "grayscale":
                return (colorVal.match(this.exclusionRegex.grayscale)) ? false : true
            case "rgbDecimal":
                var colorLenght = colorVal.split(/[^0-9a-z]/)
                var indexOfDeciaml = colorVal.indexOf('rgb') > -1 || colorVal.indexOf('decimal') > -1
                return (colorLenght.length > 2 && !indexOfDeciaml) ? false : true  
            case "pantone": 
                return (colorVal.match(this.exclusionRegex.pantone)) ?  false : true   
            case "rgb":   
                return (colorVal.match(this.exclusionRegex.rgb)) ?  false : true     
            default:
                return false
        }
    }
}

class colorIdentify extends abstractColor {
    constructor(input) {
        super()
        this.input = input
        this.raw = new sanitizer(input)
    }

    get cmyk() {
        const { cmyk } = this.raw
        if (cmyk && this.exclude(this.input, 'cmyk')) {
            for (const i of 'cmyk') {
                cmyk[i] = this.abstractMakeInt(cmyk[i])
                if (isNaN(cmyk[i]) || cmyk[i] < 0 || cmyk[i] > 100) {
                    return false
                }
            }
            return true
        }

        return false
    }

    falseCmyk(stringCmyk) {
        let cmykArray = stringCmyk.replace(/[a-z]/g, '').split(/[^0-9]/)
        if (cmykArray.length === 4) {
            return true
        }
        return false
    }

    falseRgb(stringCmyk) {
        let cmykArray = stringCmyk.replace(/[a-z]/g, '').split(/[^0-9]/)
        if (cmykArray.length === 3) {
            return true
        }
        return false
    }

    get grayscale() {
        let { grayscale } = this.raw
        if (grayscale && this.exclude(this.input, 'grayscale')) {
            return grayscale >= 0 && grayscale <= 100
        }
        return false
    }

    get hex3() {
        const { hex3 } = this.raw
        return (this.exclude(this.input, 'hex3') && hex3.length === 3) ? hex3 : false
    }

    get hex4() {
        const { hex4 } = this.raw
        return (this.exclude(this.input, 'hex4') && hex4.length === 4) ? hex4 : false
    }

    get hex6() {
        const { hex6 } = this.raw
        return (this.exclude(this.input, 'hex3') && hex6.length === 6) ? hex6 : false
    }

    get hex8() {
        const { hex8 } = this.raw
        return (this.exclude(this.input, 'hex8') && hex8.length === 8) ? hex8 : false
    }

    get html() {
        const { html } = this.raw
        if (html) {
            return convertColor.pullDataFromList('html', html)
        }
        return false
    }

    get hsl() {
        const { hsl } = this.raw
        if (hsl) {
            for (const i of 'hsl') {
                hsl[i] = this.abstractMakeInt(hsl[i])
            }

            if (hsl.h >= 0 && hsl.h <= 360 && hsl.s >= 0 && hsl.s <= 100 && hsl.l >= 0 && hsl.l <= 100) {
                if (this.procentRequire(hsl.s, hsl.l)) {
                    hsl.s *= 100
                    hsl.l *= 100
                }
                return hsl
            }
        }

        return false
    }

    get hsv() {
        const { hsv } = this.raw
        if (hsv) {
            for (const i of 'hsv') {
                hsv[i] = this.abstractMakeInt(hsv[i])
            }

            if (hsv.h >= 0 && hsv.h <= 360 && hsv.s >= 0 && hsv.s <= 100 && hsv.v >= 0 && hsv.v <= 100) {
                if (this.procentRequire(hsv.s, hsv.l)) {
                    hsv.s *= 100
                    hsv.v *= 100
                }
                return hsv
            }
        }

        return false
    }

    get lab() {
        const { lab } = this.raw
        if (lab) {

            for (const i of 'lab') {
                lab[i] = this.abstractMakeInt(lab[i])
            }

            if (
                (lab.l >= 0 && lab.l <= 100) &&
                (lab.a >= -128 && lab.a <= 127) &&
                (lab.b >= -128 && lab.b <= 127)) {
                return lab
            }
        }

        return false
    }

    get pantone() {
        const { pantone } = this.raw
        if (pantone && this.exclude(this.input, 'pantone')) {
            if (pantone <= 5875 && pantone >= 100) {
                return pantone
            }
        }

        return false
    }

    get ral() {
        const { ral } = this.raw
        if (ral) {
            return convertColor.pullDataFromList('ral', ral)
        }
        return false
    }

    get rgb() {
        const { rgb } = this.raw
        if (rgb && this.exclude(this.input, 'rgb')) {
            for (const i of 'rgb') {
                rgb[i] = this.abstractMakeInt(rgb[i], 255)
                if (isNaN(rgb[i]) || rgb[i] < 0 || rgb[i] > 255) {
                    return false
                }
            }
            return rgb
        }

        return false
    }

    get rgba() {
        const { rgba } = this.raw

        if (rgba) {
            for (const i of 'rgb') {
                rgba[i] = this.abstractMakeInt(rgba[i], 255)
                if (isNaN(rgba[i]) || rgba[i] < 0 || rgba[i] > 255) {
                    return false
                }
            }
            rgba.a = parseFloat(rgba.a)
            return (rgba.a >= 0 && rgba.a <= 1) ? rgba : false

        }

        return false
    }

    get rgbDecimal() {
        const { rgbDecimal } = this.raw

        if (typeof rgbDecimal === 'string') {
            let numericData = rgbDecimal.match(/(\d+)/g)
            if (numericData) {
                numericData = numericData[0]

                if (rgbDecimal.indexOf('rgb') > -1 || rgbDecimal.indexOf('decimal') > -1) {
                    return numericData
                } else {
                    if (this.exclude(this.input, 'rgbDecimal') && this.abstractMakeInt(numericData) > 65792) {
                        return numericData
                    } else {
                        return false
                    }

                }
            }
        }

        return false
    }

    get w() {
        let { w } = this.raw
        if (w) {
            if (typeof w === 'string' && w.indexOf(w) > -1) {
                w = this.makeInt(w.replace(/[^0-9]/, ''))
            }
            if (typeof w === 'number') {
                return (w >= 380 && w <= 780) ? w : false
            }
        }

        return false
    }

    get xyz() {
        const { xyz } = this.raw
        if (xyz) {
            for (const i of 'xyz') {
                xyz[i] = this.abstractMakeInt(xyz[i])
                if (xyz[i] <= 0) {
                    return false
                }
            }
            return xyz
        }
        return false

    }

    get yuv() {
        const { yuv } = this.raw
        if (yuv) {
            for (const i of 'yuv') {
                yuv[i] = this.abstractMakeInt(yuv[i])
                if (yuv[i] < 0 || yuv[i] > 256) {
                    return false
                }
            }
            return yuv
        }
        return false
    }
}

module.exports = function (input, forceFormat) {


    const accepted_colors = new AcceptedColors();
    const identify = new colorIdentify(input)

    if (forceFormat) {
        return identify[forceFormat]
    } else {
        for (const aColor of accepted_colors.keys) {
            if (identify[aColor]) {
                return aColor
            }
        }
    }

    if (identify.falseCmyk(input)) {
        return 'cmyk'
    }

    if (identify.falseRgb(input)) {
        return 'rgb'
    }


    return false
}