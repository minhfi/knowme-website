/**
 * [].clear polyfill
 */
if (!Array.prototype.clear) {
  Array.prototype.clear = function clear() {
    this.splice(0, this.length)
  }
}

/**
 * [].random polyfill
 */
if (!Array.prototype.random) {
  Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
  }
}

/**
 * Array.ensure polyfill
 */
export const ensure = <T = any>(val: T | T[], defaults?: T[]): T[] => {
  if (Array.isArray(val)) {
    return val
  }

  if (Array.isArray(defaults)) {
    return defaults
  }

  return [val]
}

if (!Array.ensure) {
  Array.ensure = ensure
}
