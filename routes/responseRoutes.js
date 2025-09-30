const express = require('express');
const router = express.Router();
const {
  submitResponse,
  getResponsesByFormId,
  getAllResponses,
  deleteResponse
} = require('../controllers/responseController');

router.post('/', submitResponse);

router.get('/', getAllResponses);

router.get('/form/:formId', getResponsesByFormId);

router.delete('/:id', deleteResponse);

module.exports = router;