module.exports = [
    ['cmyk 10 20 50 6', { format: 'cmyk' }], // cmyk
    ['cMyk 10 20 50 6', { format: 'cmyk' }],
    ['10 20 50 6', { format: 'cmyk' }],
    ['10 20 50 6 cmyk', { format: 'cmyk' }],
    ['c: 10 m:20 y:50 k:6', { format: 'cmyk' }],
    ['c: 10 m:20 k:50 y:6', { format: 'cmyk' }],
    ['c:10m:20k:50y:6', { format: 'cmyk' }],
    ['c10m20k50y6', { format: 'cmyk' }],
    ['cmyk=39,0,39,7', { format: 'cmyk' }],
    ['cmyk(39 0 39 7)', { format: 'cmyk' }],
    ['cmyk(39,0,39,7)', { format: 'cmyk' }],
    ['cmyk(39/0/39/7)', { format: 'cmyk' }],
    ['cmyk(39;0;39;7)', { format: 'cmyk' }],
    ['21', { format: 'grayscale' }], // grayscale
    ['21%', { format: 'grayscale' }],
    ['g 21', { format: 'grayscale' }],
    ['g:21', { format: 'grayscale' }],
    ['g=21', { format: 'grayscale' }],
    ['grayscale 21', { format: 'grayscale' }],
    ['grayscale:21', { format: 'grayscale' }],
    ['grayscale=21', { format: 'grayscale' }],
    ['mono 21', { format: 'grayscale' }],
    ['mono:21', { format: 'grayscale' }],
    ['mono=21', { format: 'grayscale' }],
    ['mono 21%', { format: 'grayscale' }],
    ['9E9', { format: 'hex3' }], // hex 3
    ['#9E9', { format: 'hex3' }],
    ['hex 9E9', { format: 'hex3' }],
    ['hex #9E9', { format: 'hex3' }],
    ['hex3 9E9', { format: 'hex3' }],
    ['hex3 #9E9', { format: 'hex3' }],
    ['hex9E9', { format: 'hex3' }],
    ['hex3 9E9', { format: 'hex3' }],
    ['0x9E9', { format: 'hex3' }],
    ['Ox9E9', { format: 'hex3' }],
    ['hex 0x9E9', { format: 'hex3' }],
    ['hex3 0x9E9', { format: 'hex3' }],
    ['hex3 #0x9E9', { format: 'hex3' }],
    ['hex ox9E9', { format: 'hex3' }],
    ['AF02', {format: 'hex4'}],
    ['FFAA21', {format: 'hex6'}],
    ['1212FF21', {format: 'hex8'}],
    ['magenta', {format: 'html'}],
    ['red', { format: 'html' }],
    ['html red', { format: 'html' }],
    ['hsl 10 20 14', {format: 'hsl'}],
    ['hsv 10 20 14', {format: 'hsv'}],
    ['lab 10 20 14', {format: 'lab'}],
    ['pantone 100', {format: 'pantone'}],
    ['pantone 100C', {format: 'pantone'}],
    ['ral 7015', {format: 'ral'}],
    ['10 20 15', {format: 'rgb'}],
    ['rgb 10 20 15', {format: 'rgb'}],
    ['rgba 10 20 15 0.2', {format: 'rgba'}],
    ['rgb 16711680', { format: 'rgbDecimal' }],
    ['rgbdecimal 16711680', { format: 'rgbDecimal' }],
    ['rgbDecimal 16711680', { format: 'rgbDecimal' }],
    ['rgb decimal 16711680', { format: 'rgbDecimal' }],
    ['rgb numeric 16711680', { format: 'rgbDecimal' }],
    ['w 450', {format: 'w'}],
    ['xyz 10 20 4', {format: 'xyz' }],
    ['yuv 20 20 4', {format: 'yuv'}],
    ['black', { format: 'html' }],
    ['bac', { format: 'hex3' }],
    ['nimic', { format: false }],
    ['c: 10 m:20 k:50 y:6', { format: 'cmyk', cmyk: { c: 10, m: 20, k: 50, y: 6 } }],
    ['g: 30', { format: 'grayscale', cmyk: { c: 0, m: 0, k: 30, y: 0 }}],
    ['rgb 0 255 0', { format: 'rgb', rgb: { r: 0, g: 255, b: 0 }}],
    ['rgb(0 255 0)', { invert: { r: 255, g: 0, b: 255 }}], // invert
    ['rgb 60 8 10', { invert: { r: 8, g: 60, b: 58 }}],
    ['rgb 60 8 10', { invert: { r: 8, g: 60, b: 58 }}],
    ['RAL 1011', { invert: { ral: 5014, name: 'Pigeon Blue', lrv: 19 }}],
    ['rgb 60 8 10', { primary: { r: 255, g: 0, b: 0 }}], // primary
    ['red', { primary: 'Red'}],
    ['RAL 1011', { primary: { ral: 7034, name: 'Yellow Grey', lrv: 25 }}],
    ['ral 7015', { primary: { ral: 8002, name: 'Signal Brown', lrv: 10 }}],
    ['rgb 60 8 10', { secondary: { r: 255, g: 0, b: 255 }}], // secoundary
    ['red', { secondary: 'Yellow'}],
    ['RAL 1011', { secondary: { ral: 1016, name: 'Sulfur Yellow', lrv: 71 }}],
    ['rgb 60 8 10', { tertiary: { r: 255, g: 0, b: 128 }}], // tertiary
    ['red', { tertiary: 'Dark Orange'}],
    ['RAL 1011', { tertiary: { ral: 1017, name: 'Saffron Yellow', lrv: 49 }}],
    ['hsl(10 50 20)', { analogous: [ { h: 340, s: 50, l: 20 }, { h: 10, s: 50, l: 20 }, { h: 40, s: 50, l: 20 } ]}], // analogous
    ['Coral', { analogous: [ 'Salmon', 'Coral', 'Sandy Brown' ]}],
    ['DarkMagenta', { analogous: [ 'Indigo', 'Dark Magenta', 'Brown' ]}],
    ['80', { analogous: [ 80, 80, 80 ]}],
    ['#801', { tints: [ '801', 'A01',  'D01',  'F01',  'F13',  'F45',  'F67',  'F89',  'FBB',  'FDD',  'FFF' ]}], // tints
    ['#801', { shades: [ '000',    '000',    '100',    '200',    '300',    '400',   '500',    '500',    '600',    '700',    '801' ]}], // shades
    ['yellow', { complementary: [ 'Blue', 'Yellow' ]}], // complementary
    ['#801', { complementary: [ '#087', '#801' ]}],
    ['RaL 5001', { complementary: [ 'RAL 8011', 'RAL 5001' ]}],
]
