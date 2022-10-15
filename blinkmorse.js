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
  'z': '--..'
}

function blinkMorse(input) {
  input.toLowerCase().split('').forEach(x => {
    (translation[x] ?? '').split('').forEach(y => {
      blink1.setRGB(0, 255, 0)
      y === '-' ? sleep(400) : sleep(100)
      blink1.off()
      sleep(100)
    })
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