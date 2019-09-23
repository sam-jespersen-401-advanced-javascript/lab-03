/* import and use validators */
const casters = require('./validator');
const { ModelError } = require('./Errors');

class Schema {
  /**
   * Create a model schema
   * @param {object} schema - the schema to apply to models
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Run validation on the supplied model 
   * @param {object} model - the model to validate
   * @throws {ModelError} throws if model does not conform to schema
   * @returns {object} - validated data record
   */
  validate(model) {
    let returnModel = {};

    try {
      const schemaKeys = Object.keys(this.schema);

      for(let i = 0; i < schemaKeys.length; i++) {
        const key = schemaKeys[i];
        const type = this.schema[key].type;
        const caster = casters.getCaster(type);

        returnModel[key] = caster(model[key]);
      }
      return returnModel;
    }
    catch(error) {
      throw new ModelError(error);
    }

  }
}

module.exports = Schema;