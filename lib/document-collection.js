const files = require('./files');
const shortid = require('shortid');
const path = require('path');


class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }

  save(object) {
    const id = shortid.generate();
    const JSONedObject = JSON.stringify(object);
    const dest = `${path.join(this.folder, id)}.json`;

    return files.writeFile(dest, JSONedObject, 'utf-8')
      .then(() => {
        return object;
      })
      .catch(err => {
        return err;

      });
  }


  get(id) {
    const filePath = path.join(this.folder, id);
    return files.readFile(`${filePath}.json`, 'utf-8')
      .then(file => {
        return JSON.parse(file);
      })
      .catch(err => {
        return err;
      });

  }

  getAll() {
    return files.readdir(this.folder)
      .then(files => {
        return Promise.all(
          files.map(file => {
            let fileName = file.split('.')[0];
            return this.get(fileName, 'utf-8');
          })
        );
      })
      .catch(err => {
        return err;
      });
  }
}
module.exports = { DocumentCollection };