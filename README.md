
![build passing](https://travis-ci.org/draganradu/dot-color-js.svg?branch=master) ![License](https://img.shields.io/npm/l/dot-color) ![maintained](https://img.shields.io/maintenance/yes/2020) ![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/dot-color) ![Node Version](https://img.shields.io/node/v/dot-color)
# Dot color JS

[Demo](http://fotodex.ro/)

This is a modernized version of [simple-color](https://www.npmjs.com/package/simple-color-converter) it uses modern JavaScript getters and setters and all sorts of JavaScript goodness to make one of the lightest but most feature dense color convertors for JavaScript you can find on NPM.

## Usage
Use [link](https://github.com/draganradu/dot-color-js/blob/master/documentation/dot_color_js_documentation.md) for full documentation.
```javascript

const dotColor = require("dot-color")
const color = new dotColor()

color.cmyk = "cmyk 0 50 60 60"
console.log(color.ral) // {lrv: 5, name: "Red Brown", ral: 8012}

color.rgb = "rgb 10 60 240"
console.log(color.ral) // {lrv: 4, name: "Ultramarine Blue", ral: 5002}

console.log(color.hex3) // "03F"
console.log(color.hex8) // 0A3CF0FF"
console.log(color.rgb) // {b: "240", g: "60", r: "10"}
console.log(color.cmyk) // {c: 96, k: 6, m: 75, y: 0}

```

## Features
1 | [Identify](https://github.com/draganradu/dot-color-js/tree/master/documentation/dot_color_js_documentation.md#2--set-color) color values from string 
2 | [Convert](https://github.com/draganradu/dot-color-js/tree/master/documentation/dot_color_js_documentation.md#4--accepted-colors) to any color format
3 | Generate [color patterns](https://github.com/draganradu/dot-color-js/tree/master/documentation/dot_color_js_documentation.md#8--color-patterns)
4 | Use [logical javascript design pattern](https://github.com/draganradu/dot-color-js/tree/master/documentation/dot_color_js_documentation.md#6--utility-keys) for custom color objects

## Supported colors
The main thing we do better than any other color convertor is the ability to get any string and figure out if there is a color buried in there. We designed this package to be used behind an input field where the values can range from "RED" to "CMYK 30 20 10 5" and even "C 30 K 5 M 20 Y 10". The rule is: if you can read it as a color, we identify it as a valid color.

[Accepted colors input test](exemple_color.md)

| color system      |  object   | array     | string (basic format) |
| ---               |  ---      | ---       | ---    |
| cmyk              | {c: 39, m: 0, y: 39, k: 7} | [39, 0, 39.7] | 'cmyk 39 0 39 7'
| grayscale         |           |           | '78' |
| hex3              |           |           | '#9E9' |
| hex4              |           |           | '#9E9F' |
| hex6              |           |           | '#90EE90' |
| hex8              |           |           | '#90EE90FF' |
| html              |           |           | 'Light Green' |
| hsl               | { h: 120, s: 73.4, l: 74.9 } | [120, 73.4, 74.9] | 'hsl 120 73.4 74.9' |
| hsv               | { h: 120, s: 39.4, l: 93.3 } | [120, 39.4, 93.3] | 'hsl 120 39.4 93.3' |
| lab               |  {l: 86.5, a: -46.3, b: 36.9} | [86.5, -46.3, 36.9] | 'lab 86.5 -46.3 36.9' |
| pantone           | {name: '358C'} | | 'pantone 358C' |
| ral   | { ral : 6019 } | | 'ral 6019'|
| rgb | { r: 144, g: 238, b: 144 } | [144, 238, 144] | 'rgb 144 238 144'|
| rgba | { r: 144, g: 238, b: 144, a: 1 } | [144, 238, 144, 1] | 'rgba 144 238 144 1'|
| rgb decimal | | | 'rgb decimal 6812065' | 
| w | { r: 144, g: 238, b: 144, a: 1 } | [144, 238, 144, 1] | 'w 544' |
| xyz | { x: 44, y: 69, z: 45 } | [44, 69, 45] | 'xyz 44 69 45' |
| yuv | { y: 180, u: 113.2, v: 73.5 } | [ 180, 113.2, 73.5 ] | 'yuv 180 113.2 73.5' |


## Contribute
If there are any features you would like to support, or want to add it directly please send us a pull request. I`m more than happy.
If you have any suggestions or you spotted an aberrant behavior or bugs, don't hesitate to send me an email. 

There is only one rule, no breaking changes

## License
Copyright © 2020, Radu Dragan. Licensed under the [MIT License](https://github.com/draganradu/dot-color-js/blob/master/LICENSE).

## Thank you

I`m Radu, Thank you for using my color convertor, I hope it is useful for you. I'm genuinely excited to build this kind of solutions.