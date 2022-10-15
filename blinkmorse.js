const Blink1 = require('node-blink1')

const blink1 = new Blink1()

const translation = {
  'a': '.-',
  'b': '-...',
  'c': '-.-.',
  'd': '-..',
  'e': '.',
  'f': '..-.',
  'g': '--.',
  'h': '....',
  'i': '..',
  'j': '.---',
  'k': '-.-',
  'l': '.-..',
  'm': '--',
  'n': '-.',
  'o': '---',
  'p': '.--.',
  'q': '--.-',
  'r': '.-.',
  's': '...',
  't': '-',
  'u': '..-',
  'v': '...-',
  'w': '.--',
  'x': '-..-',
  'y': '-.--',
  'z': '--..',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '0': '-----',
  ' ': ' '
}

const DIT_DURATION = 100
const DAH_DURATION = DIT_DURATION * 3

function blinkMorse(input) {
  input
    .trim()
    .replace(/\s\s+/g, ' ')
    .toLowerCase()
    .split('')
    .forEach(x => {
      (translation[x] ?? '').split('').forEach((y) => {
        if (y === ' ') {
          sleep(DIT_DURATION * 2)
        } else {
          blink1.setRGB(0, 255, 0)
          if (y === '.') {
            sleep(DIT_DURATION)
          } else {
            sleep(DAH_DURATION)
          }
          blink1.off()
          sleep(DIT_DURATION)
        }
      })
      sleep(DIT_DURATION * 2)
    })
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

module.exports = blinkMorse