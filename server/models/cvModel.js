const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    aboutMe: { type: String }, // Jdid
    experience: { type: String }, // Structured Text
    education: { type: String }, 
    skills: { type: String }, // Comma separated
}, { 
    timestamps: true 
});

module.exports = mongoose.model('CV', cvSchema);