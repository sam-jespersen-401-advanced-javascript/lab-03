const SchemaValidator = require('../lib/Schema');
const { ModelError } = require('../lib/Errors');

describe('Schema', () => {

  const personSchema = {
    firstName: { type: 'string', required: true },
    lastName: { type: 'string', required: true },
    married: { type: 'boolean' },
    kids: { type: 'number' }
  };

  const schemaValidator = new SchemaValidator(personSchema);

  const validModel = {
    firstName: 'Sam',
    lastName: 'Butts',
    married: false,
    kids: 0
  };

  const validModelWithCasting = {
    firstName: 'Sam',
    lastName: 'Butts',
    married: 'false',
    kids: '0'
  };

  const invalidModel = {
    firstName: [],
    lastName: 'Butts',
    married: 'false',
    kids: '0'
  };

  it('validates correct model', () => {
    expect(schemaValidator.validate(validModel)).toEqual(validModel);
    expect(schemaValidator.validate(validModelWithCasting)).toEqual(validModel);
  });

  it('invalid model throws error', () => {
    expect(() => {
      schemaValidator.validate(invalidModel);
    }).toThrow(ModelError);
  });
});
