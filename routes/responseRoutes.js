const express = require('express');
const router = express.Router();
const {
  submitResponse,
  getResponsesByFormId,
  getAllResponses,
  deleteResponse
} = require('../controllers/responseController');

// POST /api/responses - Submit form response
router.post('/', submitResponse);

// GET /api/responses - Get all responses
router.get('/', getAllResponses);

// GET /api/responses/form/:formId - Get responses by form ID
router.get('/form/:formId', getResponsesByFormId);

// DELETE /api/responses/:id - Delete response
router.delete('/:id', deleteResponse);

module.exports = router;