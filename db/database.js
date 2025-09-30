const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

// Forms database
const formsAdapter = new JSONFile(path.join(__dirname, 'forms.json'));
const formsDb = new Low(formsAdapter, { forms: [] });

// Responses database
const responsesAdapter = new JSONFile(path.join(__dirname, 'responses.json'));
const responsesDb = new Low(responsesAdapter, { responses: [] });

// Initialize databases
const initDatabases = async () => {
  await formsDb.read();
  await responsesDb.read();
};

// Initialize on module load
initDatabases();

module.exports = {
  formsDb,
  responsesDb
};