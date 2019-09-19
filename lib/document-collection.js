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
    return files.writeFile(dest, JSONedObject)
      .then(res => {
        return JSON.parse(res);
      })
      .catch(err => {
        return err;

      });
  }


  get(id) {
    // TODO:
    // 1. create file path from id
    // 2. use promisified fs to read file
    // 3. deserialize contents
    // 4. "return" object
    // 5. if expected, turn promisified fs errors into meaningful database errors
  }

  getAll() {
    // TODO:
    // 1. read folder file names
    // 2. use Promise.all and map each file name to a this.get call (remove .json file extension!)
    // 3. "return" array of objects
    // 4. if expected, turn promisified fs errors into meaningful database errors
  }
}

module.exports = { DocumentCollection };