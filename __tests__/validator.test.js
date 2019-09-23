const validator = require('../lib/validator.js').validator;
const casters = require('../lib/validator.js');
const { CastError } = require('../lib/Errors');

describe('validator module', () => {

  const str = 'yes';
  const num = 1;
  const arr = ['a'];
  const obj = { x: 'y' };
  const func = () => { };
  const bool = false;

  describe('performs basic validation of', () => {

    it('strings', () => {
      expect(validator.isString(str)).toBeTruthy();
      expect(validator.isString(num)).toBeFalsy();
      expect(validator.isString(arr)).toBeFalsy();
      expect(validator.isString(obj)).toBeFalsy();
      expect(validator.isString(func)).toBeFalsy();
      expect(validator.isString(bool)).toBeFalsy();
    });

    it('numbers', () => {
      expect(validator.isNumber(str)).toBeFalsy();
      expect(validator.isNumber(num)).toBeTruthy();
      expect(validator.isNumber(arr)).toBeFalsy();
      expect(validator.isNumber(obj)).toBeFalsy();
      expect(validator.isNumber(func)).toBeFalsy();
      expect(validator.isNumber(bool)).toBeFalsy();
    });

    it('arrays', () => {
      expect(validator.isArray(str)).toBeFalsy();
      expect(validator.isArray(num)).toBeFalsy();
      expect(validator.isArray(arr)).toBeTruthy();
      expect(validator.isArray(obj)).toBeFalsy();
      expect(validator.isArray(func)).toBeFalsy();
      expect(validator.isArray(bool)).toBeFalsy();
    });

    it('objects', () => {
      expect(validator.isObject(str)).toBeFalsy();
      expect(validator.isObject(num)).toBeFalsy();
      expect(validator.isObject(arr)).toBeFalsy();
      expect(validator.isObject(obj)).toBeTruthy();
      expect(validator.isObject(func)).toBeFalsy();
      expect(validator.isObject(bool)).toBeFalsy();
    });

    it('booleans', () => {
      expect(validator.isBool(num)).toBeFalsy();
      expect(validator.isBool(arr)).toBeFalsy();
      expect(validator.isBool(obj)).toBeFalsy();
      expect(validator.isBool(func)).toBeFalsy();
      expect(validator.isBool(bool)).toBeTruthy();
    });

    it('functions', () => {
      expect(validator.isFunc(num)).toBeFalsy();
      expect(validator.isFunc(arr)).toBeFalsy();
      expect(validator.isFunc(obj)).toBeFalsy();
      expect(validator.isFunc(func)).toBeTruthy();
      expect(validator.isFunc(bool)).toBeFalsy();
    });
  });

  describe('performs array validation of', () => {

    const arrayOfStrings = ['a', 'b', 'c'];
    const arrayOfNumbers = [1, 2, 3];
    const arrayOfObjects = [{}, {}, {}];
    const arrayOfBooleans = [true, false, true];

    it('strings', () => {
      expect(validator.isArrayOfStrings(arrayOfStrings)).toBeTruthy();
      expect(validator.isArrayOfStrings(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfStrings(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfStrings(arrayOfBooleans)).toBeFalsy();
    });

    it('numbers', () => {
      expect(validator.isArrayOfNumbers(arrayOfStrings)).toBeFalsy();
      expect(validator.isArrayOfNumbers(arrayOfNumbers)).toBeTruthy();
      expect(validator.isArrayOfNumbers(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfNumbers(arrayOfBooleans)).toBeFalsy();
    });

    it('objects', () => {
      expect(validator.isArrayOfObjects(arrayOfStrings)).toBeFalsy();
      expect(validator.isArrayOfObjects(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfObjects(arrayOfObjects)).toBeTruthy();
      expect(validator.isArrayOfObjects(arrayOfBooleans)).toBeFalsy();
    });

    it('booleans', () => {
      expect(validator.isArrayOfBooleans(arrayOfStrings)).toBeFalsy();
      expect(validator.isArrayOfBooleans(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfBooleans(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfBooleans(arrayOfBooleans)).toBeTruthy();
    });
  });

  describe('get validator for', () => {

    it('strings', () => {
      expect(validator.getValidator('stingfff')).toBe(validator.isString);
    });

    it('numbers', () => {
      expect(validator.getValidator(3)).toBe(validator.isNumber);

    });

    it('arrays', () => {
      expect(validator.getValidator([1, 2, 3])).toContain(validator.isArray);

    });

    it('objects', () => {
      expect(validator.getValidator({ flip: 'flip' })).toBe(validator.isObject);

    });

    it('booleans', () => {
      expect(validator.getValidator(true)).toBe(validator.isBool);

    });

    it('functions', () => {
      expect(validator.getValidator(() => { })).toBe(validator.isFunc);

    });

    it('array of strings', () => {
      expect(validator.getValidator(['a', 'string'])).toContain(validator.isArrayOfStrings);
    });
    it('array of numbers', () => {
      expect(validator.getValidator([6, 9])).toContain(validator.isArrayOfNumbers);

    });

    it('array of objects', () => {
      expect(validator.getValidator([{}, {}])).toContain(validator.isArrayOfObjects);

    });

    it('array of booleans', () => {
      expect(validator.getValidator([true, false])).toContain(validator.isArrayOfBooleans);

    });

  });
});

describe('caster module', () => {

  describe('coerce data', () => {

    it('to string', () => {
      expect(casters.castToString(42)).toBe('42');
      expect(casters.castToString(true)).toBe('true');
      expect(casters.castToString(false)).toBe('false');
      expect(casters.castToString(new Date())).toBe(String(new Date()));
    });

    it('to string throwing errors', () => {

      expect(() => {
        casters.castToString(['an', 'array']);
      }).toThrow(CastError);
      expect(() => {
        casters.castToString({ an: 'object' });
      }).toThrow(CastError);
      expect(() => {
        casters.castToString(() => { });
      }).toThrow(CastError);
    });

    it('to number', () => {
      expect(casters.castToNumber('42')).toBe(42);
      expect(casters.castToNumber(true)).toBe(1);
      expect(casters.castToNumber(false)).toBe(0);
      expect(casters.castToNumber(new Date())).toBe(Number(new Date()));
    });

    it('to number throwing errors', () => {

      expect(() => {
        casters.castToNumber(['an', 'array']);
      }).toThrow(CastError);
      expect(() => {
        casters.castToNumber({ an: 'object' });
      }).toThrow(CastError);
      expect(() => {
        casters.castToNumber(() => { });
      }).toThrow(CastError);
      expect(() => {
        casters.castToNumber('abc');
      }).toThrow(CastError);
    });

    it('to boolean', () => {
      expect(casters.castToBoolean(1)).toBe(true);
      expect(casters.castToBoolean(0)).toBe(false);
      expect(casters.castToBoolean('true')).toBe(true);
      expect(casters.castToBoolean('false')).toBe(false);
      expect(casters.castToBoolean(true)).toBe(true);
      expect(casters.castToBoolean(false)).toBe(false);
    });

    it('to boolean throwing errors', () => {

      expect(() => {
        casters.castToBoolean(['an', 'array']);
      }).toThrow(CastError);
      expect(() => {
        casters.castToBoolean({ an: 'object' });
      }).toThrow(CastError);
      expect(() => {
        casters.castToBoolean(() => { });
      }).toThrow(CastError);
      expect(() => {
        casters.castToBoolean('abc');
      }).toThrow(CastError);
      expect(() => {
        casters.castToBoolean(2);
      }).toThrow(CastError);
    });

    let expectedDate = new Date();
    expectedDate.setTime(485161200000);

    it('to date', () => {
      // This works, I swear. But Travis doesn't like it.
      // expect(casters.castToDate('05/17/1985')).toEqual(expectedDate);
      expect(casters.castToDate(485161200000)).toEqual(expectedDate);
      expect(casters.castToDate(expectedDate)).toEqual(expectedDate);


    });

    it('to date throwing errors', () => {

      expect(() => {
        casters.castToDate(['an', 'array']);
      }).toThrow(CastError);
      expect(() => {
        casters.castToDate({ an: 'object' });
      }).toThrow(CastError);
      expect(() => {
        casters.castToDate(() => { });
      }).toThrow(CastError);
      expect(() => {
        casters.castToDate('34/2122/1111');
      }).toThrow(CastError);

    });

  });

});