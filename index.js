const db = require('./lib/database');
const dbPath = './db';
db.connect(dbPath);

const animalModel = require('./models/models');

const model1 = {
  name: 'Bessy',
  type: 'cow',
  large: true,
  eyes: 2
};

const model2 = {
  name: 'Hortence',
  type: 'spider',
  large: false,
  eyes: 8
};

animalModel.create(model1);
animalModel.create(model2);

animalModel.find()
  .then(res => {
    console.log(res);
  });

animalModel.findById('laTCL7iu')
  .then(res => {
    console.log(res);
  });

db.close();