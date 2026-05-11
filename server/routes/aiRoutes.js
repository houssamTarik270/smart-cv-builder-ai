const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const auth = require('../middleware/auth');

// Had l-lien ghadi y-koun: http://localhost:5000/api/ai/optimize
router.post('/optimize', auth, aiController.optimizeText);

module.exports = router;