const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/register', register);
router.post('/login', login);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Crée Token JWT pour maintenir session [cite: 134]
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // transferer token  au Frontend (Redirect)
    res.redirect(`http://localhost:5173/login?token=${token}`);
  }
);

module.exports = router;