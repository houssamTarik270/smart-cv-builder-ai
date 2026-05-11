const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/register', register);
router.post('/login', login);

// 🌐 Route li k-t-sift l-user l Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// ↩️ Callback route mlli Google k-t-rje3 l-user
router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Crée Token JWT bach n-maintainiw l-session [cite: 134]
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Sift l-token l l-Frontend (Redirect)
    res.redirect(`http://localhost:5173/login?token=${token}`);
  }
);

module.exports = router;