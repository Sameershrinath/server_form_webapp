const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

const formsAdapter = new JSONFile(path.join(__dirname, 'forms.json'));
const formsDb = new Low(formsAdapter, { forms: [] });

const responsesAdapter = new JSONFile(path.join(__dirname, 'responses.json'));
const responsesDb = new Low(responsesAdapter, { responses: [] });

const initDatabases = async () => {
  await formsDb.read();
  await responsesDb.read();
};

initDatabases();

module.exports = {
  formsDb,
  responsesDb
};