const { DocumentCollection } = require('./lib/document-collection');

const path = './test';
const documents = new DocumentCollection(path);

// write some code to exercise your document collection

const objectToSave = {
  text: 'value',
  read: true
};

documents.save(objectToSave);

documents.get('L-PFu3AA')
  .then(res => {
    console.log(res);
  });

documents.getAll()
  .then(res => {
    console.log('ALL', res);
  });