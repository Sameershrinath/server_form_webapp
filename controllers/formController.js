const { formsDb } = require('../db/database');
const { v4: uuidv4 } = require('uuid');

// Get all forms
const getAllForms = async (req, res) => {
  try {
    await formsDb.read();
    const forms = formsDb.data.forms || [];
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch forms' });
  }
};

// Get form by ID
const getFormById = async (req, res) => {
  try {
    await formsDb.read();
    const { id } = req.params;
    const form = formsDb.data.forms.find(f => f.id === id);
    
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    
    res.json(form);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch form' });
  }
};

// Create new form
const createForm = async (req, res) => {
  try {
    await formsDb.read();
    const { title, description, fields } = req.body;
    
    if (!title || !fields || !Array.isArray(fields)) {
      return res.status(400).json({ error: 'Title and fields are required' });
    }
    
    const newForm = {
      id: uuidv4(),
      title,
      description: description || '',
      fields,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    };
    
    formsDb.data.forms.push(newForm);
    await formsDb.write();
    
    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create form' });
  }
};

// Update form
const updateForm = async (req, res) => {
  try {
    await formsDb.read();
    const { id } = req.params;
    const { title, description, fields, isActive } = req.body;
    
    const formIndex = formsDb.data.forms.findIndex(f => f.id === id);
    
    if (formIndex === -1) {
      return res.status(404).json({ error: 'Form not found' });
    }
    
    const updatedForm = {
      ...formsDb.data.forms[formIndex],
      title: title || formsDb.data.forms[formIndex].title,
      description: description !== undefined ? description : formsDb.data.forms[formIndex].description,
      fields: fields || formsDb.data.forms[formIndex].fields,
      isActive: isActive !== undefined ? isActive : formsDb.data.forms[formIndex].isActive,
      updatedAt: new Date().toISOString()
    };
    
    formsDb.data.forms[formIndex] = updatedForm;
    await formsDb.write();
    
    res.json(updatedForm);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update form' });
  }
};

// Delete form
const deleteForm = async (req, res) => {
  try {
    await formsDb.read();
    const { id } = req.params;
    
    const formIndex = formsDb.data.forms.findIndex(f => f.id === id);
    
    if (formIndex === -1) {
      return res.status(404).json({ error: 'Form not found' });
    }
    
    formsDb.data.forms.splice(formIndex, 1);
    await formsDb.write();
    
    res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete form' });
  }
};

module.exports = {
  getAllForms,
  getFormById,
  createForm,
  updateForm,
  deleteForm
};