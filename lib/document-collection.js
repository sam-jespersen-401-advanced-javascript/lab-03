const files = require('./files');
const shortid = require('shortid');
const path = require('path');


class DocumentCollection {
  /**
  * Create a document collection
  * @param folder
  */
  constructor(folder) {
    this.folder = folder;
  }


  /**
 * Save object as JSON to supplied folder 
 * @param {object} object - the object to save to json
 * @returns {object} - the object saved
 */
  save(object) {
    const id = shortid.generate();
    object.id = id;
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

  /**
  * Get object from folder
  * @param {string} id - the id of the object desired
  * @returns {object} - the object found
  */
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

  /**
  * Get an array of all saved objects
  * @returns {array} - an array of the objects contained within the provided folder
  */
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
module.exports = DocumentCollection;