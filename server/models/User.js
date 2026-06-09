const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true },

  // ── Email verification ──────────────────────────────────────────
  isVerified:       { type: Boolean, default: false },
  verifyOtp:        { type: String,  default: null },
  verifyOtpExpires: { type: Date,    default: null },

  // ── Password reset ───────────────────────────────────────────────
  resetOtp:         { type: String,  default: null },
  resetOtpExpires:  { type: Date,    default: null },

  // ── Google OAuth (optional – keeps existing flow intact) ─────────
  googleId: { type: String, default: null },

  createdAt: { type: Date, default: Date.now }
});

// ✅ Hash password before saving (Mṣa77a n9īya bla next)
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Helper – compare plain text with hash
userSchema.methods.comparePassword = async function (plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model('User', userSchema);