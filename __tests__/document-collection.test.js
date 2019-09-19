jest.mock('../lib/files.js', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
}));

// for setting up mock expectations
const { readFile, writeFile, readdir } = require('../lib/files');
const { DocumentCollection } = require('../lib/document-collection');

describe('Document Collection', () => {

  const folder = './fake/path';
  const docs = new DocumentCollection(folder);
  const object1 = { text: `I'm an object` };
  writeFile.mockResolvedValue(object1);

  it('save object', () => {
    docs.save(object1)
      .then(() => {
        const writeCalls = writeFile.mock.calls;
        expect(writeCalls.length).toBe(1);
        expect(writeCalls[0][1]).toEqual(object1);
        expect(writeCalls[0][0]).toContain(folder);

      });
  });
});
