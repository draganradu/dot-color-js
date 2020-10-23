'use strict'
const sanitize = require('./components/sanitization')
const identify = require('./components/identify')
const convertColor = require('./components/convert_color')
const colorScaffolding = require('./components/colorScaffolding')

// ----------------------------- A | Object Class
class objectiveColor {
    constructor(inputColor) {
        this.init()
        this.colorExtractor(inputColor)
    }

    colorExtractor(inputColor, setFormat) {
        delete this.format
        delete this.sanitizedColor
        if (inputColor) {
            this.format = (setFormat) ? ((identify(inputColor, setFormat)) ? setFormat : false) : identify(inputColor)
            
            if (this.format) {
                this.sanitizedColor = sanitize(inputColor, this.format)
            } else {
                this.format = false
                this.sanitizedColor = false
            }
        }
    }

    init() {
      for (const colorType of this.acceptedColors.keys) {
        Object.defineProperty(this, colorType, {
          get() {
            let tempColor = false;
            let _this = this;

            if (this.format === colorType) {
              tempColor = this.sanitizedColor;
            } else if (this.format) {
              tempColor = convertColor.convert({
                from: this.format,
                to: colorType,
                color: this.sanitizedColor,
              });
            }

            return this.customColorObject({
              colorData: tempColor,
              typeOfColor: colorType,
            });
          },
          set(input) {
            this.colorExtractor(input, colorType);
          },
        });
      }

      // ----------- Alias
      Object.defineProperty(this, "color", {
        get() {
          return this.sanitizedColor;
        },
        set(input) {
          this.colorExtractor(input);
        },
      });

      Object.defineProperty(this, "hex", {
        get() {
          return this.hex6;
        },
        set(input) {
          this.colorExtractor(input);
        },
      });

      // ----------- converts
      Object.defineProperty(this, "invert", {
        get() {
          const { hsl } = this;
          hsl.h = this.hslCircle(hsl.h + 180)

          const tempColor = convertColor.convert({
            from: "hsl",
            to: this.format,
            color: hsl,
          });
          return this.customColorObject({
            colorData: tempColor,
            typeOfColor: this.format,
          });
        },
        set(input) {
          this.colorExtractor(input);
        },
      });
      
      Object.defineProperty(this, "primary", {
        get() {
          const tempH = this.hslSegment({ hue: this.hsl.h, segments: 3 });
          const tempColor = convertColor.convert({
            from: "hsl",
            to: this.format,
            color: { h: tempH, s: 100, l: 50 },
          });
          return this.customColorObject({
            colorData: tempColor,
            typeOfColor: this.format,
          });
        },
        set(input) {
          this.colorExtractor(input);
        },
      });

      Object.defineProperty(this, "secondary", {
        get() {
          const tempH = this.hslSegment({
            hue: this.hsl.h,
            segments: 3,
            offset: 60,
          });
          const tempColor = convertColor.convert({
            from: "hsl",
            to: this.format,
            color: { h: tempH, s: 100, l: 50 },
          });
          return this.customColorObject({
            colorData: tempColor,
            typeOfColor: this.format,
          });
        },
        set(input) {
          this.colorExtractor(input);
        },
      });

      Object.defineProperty(this, "tertiary", {
        get() {
          const tempH = this.hslSegment({
            hue: this.hsl.h,
            segments: 6,
            offset: 30,
          });
          const tempColor = convertColor.convert({
            from: "hsl",
            to: this.format,
            color: { h: tempH, s: 100, l: 50 },
          });
          return this.customColorObject({
            colorData: tempColor,
            typeOfColor: this.format,
          });
        },
        set(input) {
          this.colorExtractor(input);
        },
      });

      // http://blog.clickdimensions.com/understanding-color-theory-a-quick-overview-for-marketers/
      // iro.js

      Object.defineProperty(this, "tones", {
        get() {
          const { hsl, format } = this

          const _this = {
            hslArray: [],
            hslSegments: this.segments({startPoint: 0, endpoint: 100, segments: 10}),
            buildArray: function () {
              for(let i = 0; i < this.hslSegments.length; i++ ) {
                const colorTemp = convertColor.convert({
                  from: "hsl",
                  to: format,
                  color: {h: hsl.h, s:hsl.s, l:this.hslSegments[i] },
                });
                this.hslArray.push(colorTemp)
              }
            }
          }
          _this.buildArray()
          return _this.hslArray
        },set(input) {
          this.colorExtractor(input);
        },
      });

      Object.defineProperty(this, "tints", {
        get() {
          const { hsl, format } = this

          const _this = {
            hslArray: [],
            hslSegments: this.segments({startPoint: hsl.l, endpoint: 100, segments: 10}),
            buildArray: function () {
              for(let i = 0; i < this.hslSegments.length; i++ ) {
                const colorTemp = convertColor.convert({
                  from: "hsl",
                  to: format,
                  color: {h: hsl.h, s:hsl.s, l:this.hslSegments[i] },
                });
                this.hslArray.push(colorTemp)
              }
            }
          }
          _this.buildArray()
          return _this.hslArray
        },set(input) {
          this.colorExtractor(input);
        },
      });

      Object.defineProperty(this, "shades", {
        get() {
          const { hsl, format } = this

          const _this = {
            hslArray: [],
            hslSegments: this.segments({startPoint: 0, endpoint: hsl.l, segments: 10}),
            buildArray: function () {
              for(let i = 0; i < this.hslSegments.length; i++ ) {
                const colorTemp = convertColor.convert({
                  from: "hsl",
                  to: format,
                  color: {h: hsl.h, s:hsl.s, l:this.hslSegments[i] },
                });
                this.hslArray.push(colorTemp)
              }
            }
          }
          _this.buildArray()
          return _this.hslArray
        },set(input) {
          this.colorExtractor(input);
        },
      });

      Object.defineProperty(this, "analogous", {
        get() {
          const { hsl, format } = this
          const _this = {
            hslArray: [],
            hslSegments: [this.hslCircle(hsl.h-30), hsl.h, this.hslCircle(hsl.h+30) ],
            buildArray: function () {
              for(let i = 0; i < this.hslSegments.length; i++ ) {
                const colorTemp = convertColor.convert({
                  from: "hsl",
                  to: format,
                  color: {h: this.hslSegments[i], s:hsl.s, l:hsl.l },
                });

                this.hslArray.push(colorTemp)
              }
            }
          }

          // if( format === 'html' || format === 'pantone' || format === 'ral'){
          //   _this.hslArray[1] === this.sanitizedColor
          // }

          _this.buildArray()
          return _this.hslArray
        },set(input) {
          this.colorExtractor(input);
        },
      });

      Object.defineProperty(this, "complementary", {
        get() {
          return [this.invert, this.sanitizedColor]
        },set(input) {
          this.colorExtractor(input);
        },
      });

      Object.defineProperty(this, "warmth", {
        get() {
          let _this = {
            isWarm: true,
            warm: 0,
            cold: 0
          }

          let { h } = this.hsl
          h = h - 60 
          if(h < 0) {
            h = 360 - h
          }

          if( h > 180){
            _this.isWarm = false
            _this.cold = 180 / (h%180)
            _this.warm = 180/ (Math.abs(180 - (h%180)))
          } else  {
            _this.cold = Math.abs(180 - (h%180))
            _this.warm = h%180
          }

          return _this
        },set(input) {
          this.colorExtractor(input);
        },
      });
    }
}

Object.assign(objectiveColor.prototype, colorScaffolding);

module.exports = objectiveColor