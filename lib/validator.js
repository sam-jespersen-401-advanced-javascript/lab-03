const { CastError } = require('./Errors');

/**
 * Coerce to string
 * @param input
 * @throws CastError
 * @returns {string} 
 */
const castToString = (input) => {
  if(input instanceof Date) {
    return String(input);

  } else if(input instanceof Array || input instanceof Object || input instanceof Function) {
    throw new CastError('string', input);

  } else {
    return String(input);
  }
};

/**
 * Coerce to number
 * @param input
 * @throws CastError
 * @returns {number} 
 */

const castToNumber = (input) => {
  if(input instanceof Date) {
    return Number(input);
  } else if(input instanceof Array || input instanceof Object || input instanceof Function || isNaN(Number(input))) {
    throw new CastError('number', input);
  } else {
    return Number(input);
  }

};

/**
 * Coerce to boolean
 * @param input
 * @throws CastError
 * @returns {boolean} 
 */

const castToBoolean = (input) => {
  if(isBool(input)) {
    return input;
  }
  if(isString(input) || isNumber(input)) {
    if(input === 'true' || input === 1 || input === 0) {
      return Boolean(input);
    }
    if(input === 'false') {
      return false;
    }
  }
  throw new CastError('boolean', input);
};


/**
 * Coerce to date
 * @param input
 * @throws CastError
 * @returns {Date} 
 */

const castToDate = (input) => {
  if(input instanceof Date) {
    return input;
  }
  if(isNumber(input)) {
    const date = new Date();
    date.setTime(input);
    return date;
  }
  if(isString(input)) {
    const date = Date.parse(input);
    let newDate = new Date();
    newDate.setTime(date);

    if(!isNaN(newDate)) {
      return newDate;
    } else {
      throw new CastError('date', input);
    }
  }
  throw new CastError('date', input);
};

const getCaster = (input) => {
  const casterList = {
    'string': castToString,
    'number': castToNumber,
    'boolean': castToBoolean,
    'date': castToDate
  };
  return casterList[input];
};


module.exports = {
  castToString,
  castToNumber,
  castToBoolean,
  castToDate,
  getCaster
};



/**
 * Is this a string?
 * @param input
 * @returns {boolean}
 */
const isString = input => {
  return typeof input === 'string';
};

/**
 * Is this a number?
 * @param input
 * @returns {boolean}
 */
const isNumber = input => {
  return typeof input === 'number';
};

/**
 * Is this an array?
 * @param input
 * @returns {boolean}
 */
const isArray = input => {
  return input instanceof Array;
};

/**
 * Is this an object?
 * @param input
 * @returns {boolean}
 */
const isObject = input => {
  return typeof input === 'object' && input instanceof Array === false;
};

/**
 * Is this a boolean?
 * @param input
 * @returns {boolean}
 */
const isBool = input => {
  return typeof input === 'boolean';
};

/**
 * Is this a function?
 * @param input
 * @returns {boolean}
 */
const isFunc = input => {
  return typeof input === 'function';
};

/**
 * Is this an array of strings?
 * @param {array} input 
 * @returns {boolean}
 */

const isArrayOfStrings = (arr) => {
  if(arr.length && isArray(arr)) return arr.every(isString);
};

/**
 * Is this an array of numbers?
 * @param {array} input
 * @returns {boolean}
 */

const isArrayOfNumbers = (arr) => {
  if(arr.length && isArray(arr)) return arr.every(isNumber);
};

/**
 * Is this an array of objects?
 * @param {array} input
 * @returns {boolean}
 */

const isArrayOfObjects = (arr) => {
  if(arr.length && isArray(arr)) return arr.every(isObject);
};

/**
 * Is this an array of booleans?
 * @param {array} input
 * @returns {boolean}
 */

const isArrayOfBooleans = (arr) => {
  if(arr.length && isArray(arr)) return arr.every(isBool);
};

/**
 * Based on a set of rules, what is correct validator?
 * @param input
 * @param {boolean} [inputIsArrayOfData] Evaluate input as contained within array?
 * @returns {function}
 */
const getValidator = (input) => {

  const funcs = Object.values(module.exports.validator);
  let result = [];

  for(let func in funcs) {
    const testedFunction = funcs[func];
    if(testedFunction === getValidator) break;
    if(testedFunction(input) === true) {
      result.push(testedFunction);
    }
  }
  if(result.length === 1) return result[0];
  if(result.length > 1) return result;


};

module.exports.validator = {
  isString,
  isNumber,
  isArray,
  isObject,
  isBool,
  isFunc,
  isArrayOfStrings,
  isArrayOfNumbers,
  isArrayOfObjects,
  isArrayOfBooleans,
  getValidator
};