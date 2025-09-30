const express = require('express');
const router = express.Router();
const {
  getAllForms,
  getFormById,
  createForm,
  updateForm,
  deleteForm
} = require('../controllers/formController');

// GET /api/forms - Get all forms
router.get('/', getAllForms);

// GET /api/forms/:id - Get form by ID
router.get('/:id', getFormById);

// POST /api/forms - Create new form
router.post('/', createForm);

// PUT /api/forms/:id - Update form
router.put('/:id', updateForm);

// DELETE /api/forms/:id - Delete form
router.delete('/:id', deleteForm);

module.exports = router;