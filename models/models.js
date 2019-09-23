const Model = require('../lib/model');

// model1 = {
//   name: 'Bessy',
//   type: 'cow',
//   large: true,
//   eyes: 2
// };

// model2 = {
//   name: 'Hortence',
//   type: 'spider',
//   large: false,
//   eyes: 8
// };


const config = {
  name: { type: 'string', required: true },
  type: { type: 'string', required: true },
  large: { type: 'boolean' },
  eyes: { type: 'number' }
};

const animalModel = new Model('animal', config);


module.exports = animalModel;