
class CastError extends Error {
  constructor(expectedType, providedValue) {
    super(`could not cast ${providedValue} to ${expectedType}`);
    this.expectedType = expectedType;
    this.providedValue = providedValue;
  }
}

class ModelError extends Error {
  constructor(error) {
    super('you suck lmao...' + error);
  }
}

module.exports = {
  CastError,
  ModelError
};