jest.mock('../lib/files.js', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
}));

// for setting up mock expectations
const { readFile, writeFile, readdir } = require('../lib/files');
const DocumentCollection = require('../lib/document-collection');
const path = require('path');


const folder = 'fake/path';
const docs = new DocumentCollection(folder);

describe('Document Collection', () => {

  it('save object', () => {

    const obj = { text: `Hey I'm a string over here` };
    writeFile.mockResolvedValueOnce();


    return docs.save(obj)
      .then(() => {
        const writeCalls = writeFile.mock.calls;
        expect(writeCalls.length).toBe(1);
        expect(JSON.parse(writeCalls[0][1])).toEqual(obj);
        expect(writeCalls[0][0]).toContain(folder);
      });
  });

  it('get by id', () => {

    let objectToRead = { text: 'read', id: 'test' };
    let id = 'test';
    let expectedPath = `${path.join(folder, id)}.json`;
    readFile.mockResolvedValueOnce(JSON.stringify(objectToRead));


    return docs.get(id)
      .then(doc => {
        const getCalls = readFile.mock.calls;
        expect(getCalls[0][0]).toBe(expectedPath);
        expect(getCalls.length).toBe(1);
        expect(doc).toEqual(objectToRead);
      });
  });


  it('getAll returns array of objects in folder', () => {

    let readdirResults = ['test1.json', 'test2.json'];

    let readResults1 = { text: 'test', id: 'test1' };
    let readResults2 = { text: 'test', id: 'test2' };

    readdir.mockResolvedValueOnce(readdirResults);
    readFile.mockResolvedValueOnce(JSON.stringify(readResults1));
    readFile.mockResolvedValueOnce(JSON.stringify(readResults2));

    return docs.getAll()
      .then(results => {
        expect(results.length).toBe(2);
        expect(results[0]).toEqual(readResults1);
        expect(results[1]).toEqual(readResults2);
      });
  });

});
