const { responsesDb } = require('../db/database');
const { v4: uuidv4 } = require('uuid');

// Submit form response
const submitResponse = async (req, res) => {
  try {
    await responsesDb.read();
    const { formId, responses } = req.body;
    
    if (!formId || !responses) {
      return res.status(400).json({ error: 'Form ID and responses are required' });
    }
    
    const newResponse = {
      id: uuidv4(),
      formId,
      responses,
      submittedAt: new Date().toISOString()
    };
    
    responsesDb.data.responses.push(newResponse);
    await responsesDb.write();
    
    res.status(201).json({ message: 'Response submitted successfully', id: newResponse.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit response' });
  }
};

// Get all responses for a form
const getResponsesByFormId = async (req, res) => {
  try {
    await responsesDb.read();
    const { formId } = req.params;
    
    const formResponses = responsesDb.data.responses.filter(r => r.formId === formId);
    
    res.json(formResponses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
};

// Get all responses
const getAllResponses = async (req, res) => {
  try {
    await responsesDb.read();
    const responses = responsesDb.data.responses || [];
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
};

// Delete response
const deleteResponse = async (req, res) => {
  try {
    await responsesDb.read();
    const { id } = req.params;
    
    const responseIndex = responsesDb.data.responses.findIndex(r => r.id === id);
    
    if (responseIndex === -1) {
      return res.status(404).json({ error: 'Response not found' });
    }
    
    responsesDb.data.responses.splice(responseIndex, 1);
    await responsesDb.write();
    
    res.json({ message: 'Response deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete response' });
  }
};

module.exports = {
  submitResponse,
  getResponsesByFormId,
  getAllResponses,
  deleteResponse
};