const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');

// Melli t-sift POST l-had l-lien, ghadi y-tsajjel CV
router.post('/', cvController.createCV);

// Melli t-sift GET, ghadi y-jib lik kolchi
router.get('/', cvController.getAllCVs);

module.exports = router;