/**
 * Converts a hex color code to RGB
 *
 *
 * @param hex string color code.
 * @returns object with r, g, and b keys.
 *
 */
function hexToRgb(hex) {
  if (hex.startsWith('#')) hex = hex.substring(1)
  var bigint = parseInt(hex, 16)
  var r = (bigint >> 16) & 255
  var g = (bigint >> 8) & 255
  var b = bigint & 255

  return {r, g, b}
}

module.exports = {
  hexToRgb,
}
