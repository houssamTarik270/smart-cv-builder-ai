const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');
const auth = require('../middleware/auth');

// Melli t-sift POST l-had l-lien, ghadi y-tsajjel CV
router.post('/', auth, cvController.createCV);

// Melli t-sift GET, ghadi y-jib lik kolchi
router.get('/', auth, cvController.getAllCVs);

module.exports = router;