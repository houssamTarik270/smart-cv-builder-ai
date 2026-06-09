const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    
    
    fullName: { type: String }, 
    email: { type: String }, 
    phone: { type: String },
    aboutMe: { type: String }, 
    
    experience: { type: mongoose.Schema.Types.Mixed }, 
    education: { type: mongoose.Schema.Types.Mixed }, 
    skills: { type: mongoose.Schema.Types.Mixed }, 
    
    
    cvData: { type: Object } 
}, { 
    timestamps: true 
});

module.exports = mongoose.model('CV', cvSchema);