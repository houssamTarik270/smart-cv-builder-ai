const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Had l-lien ghadi y-koun: http://localhost:5000/api/ai/optimize
router.post('/optimize', aiController.optimizeText);

module.exports = router;