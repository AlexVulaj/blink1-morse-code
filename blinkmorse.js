const Blink1 = require('node-blink1')
const translationMap = require('./translation')
const {hexToRgb} = require('./utils')

const blink1 = new Blink1()

const DEFAULT_DIT_DURATION = 100
const DEFAULT_COLOR_HEX = '#00FF00'

/**
 * <i>Note - this function exists for the sake of testing and will not flash your blink(1) device on its own.</i>
 *
 * Calculates the flash timings for a Morse code translation of the given input.
 *
 * The function returns a sequential array representing the length of each flash, where even-indexed
 * entries represent the amount of time that the light was on, and odd-indexed entries represent the amount of time that
 * the light was off.  The value of each element is equivalent to the number of <i>dit</i> durations that have passed.
 *
 * For example, the input "SOS" would return a value of [1, 1, 1, 1, 1, 3, 3, 1, 3, 1, 3, 3, 1, 1, 1, 1, 1 ]
 *
 *
 * @param input the string to translate to Morse code timings.
 * @returns {Number[]} A sequential array representing the length of each flash, where even-indexed entries represent the
 * amount of time that the light was on, and odd-indexed entries represent the amount of time that the light was off.
 * The value is equivalent to the number of <i>dit</i> durations that have passed.
 */
function calculateTimings(input) {
  let onTime = 0,
    offTime = 0,
    timings = []
  input
    .toString()
    .trim()
    .replace(/\s\s+/g, ' ')
    .toLowerCase()
    .split('')
    .map(x => x)
    .forEach(x => {
      const translated = translationMap[x] ?? ''
      if (translated === '') {
        return
      }
      translated.split('').forEach(y => {
        if (y === ' ') {
          offTime += 2
        } else {
          timings.push(offTime)
          offTime = 0
          if (y === '.') {
            onTime += 1
          } else {
            onTime += 3
          }
          timings.push(onTime)
          onTime = 0
          offTime += 1
        }
      })
      offTime += 2
    })
  timings.shift()
  return timings
}

/**
 * Causes a connected blink(1) device to flash the given input in Morse code.
 *
 * A <i>dit</i> is defined as 100ms by default.
 * Flash color is green #00FF00 by default.
 *
 *
 * @param input the string to flash in Morse code.
 * @param options (optional) additional parameters for Morse code behavior.
 * @param options.ditLengthMs the length of time in milliseconds for a dit flash.
 * @param options.color hex color code for the flash color.
 *
 */
async function blinkMorse(input, options = {}) {
  const {ditLengthMs = DEFAULT_DIT_DURATION, color = DEFAULT_COLOR_HEX} = options
  const colorRgb = hexToRgb(color)
  const timings = calculateTimings(input)
  for (let i = 0; i < timings.length; i++) {
    const timing = timings[i]
    if (i % 2 === 0) {
      blink1.setRGB(colorRgb.r, colorRgb.g, colorRgb.b)
    } else {
      blink1.off()
    }
    await new Promise(done => setTimeout(() => done(), timing * ditLengthMs))
  }
  blink1.off()
}

exports.calculateTimings = calculateTimings
exports.blinkMorse = blinkMorse
