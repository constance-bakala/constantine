export class Misc {
  // Compare two items
  private static compare(item1: any, item2: any): boolean {

    // Get the object type
    const itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!this.isEqual(item1, item2)) { return false; }
    } else {

      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) { return false; }

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) { return false; }
      } else {
        if (item1 !== item2) { return false; }
      }

    }
  }

  static isEqual(value: any, other: any): boolean {

    // Get the value type
    const type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) { return false; }

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) { return false; }

    // Compare the length of the length of the two items
    const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) { return false; }

    // Compare properties
    if (type === '[object Array]') {
      for (let i = 0; i < valueLen; i++) {
        if (this.compare(value[i], other[i]) === false) { return false; }
      }
    } else {
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          if (this.compare(value[key], other[key]) === false) { return false; }
        }
      }
    }

    // If nothing failed, return true
    return true;
  }

  static toCapitalize(value: string): string {
    if (value === 'undefined' || value.length === 0) {
      return '';
    }
    const v = value.slice(1);
    return value.charAt(0).toUpperCase() + (v ? v.toLowerCase() : '');
  }

  /**
   * Method used to remove spaces in a string
   * @param {string} value The value
   * @returns {string} The values without spaces
   */
  static removeSpaces(value: string): string {
    return value.replace(/ /g, '');
  }
}
