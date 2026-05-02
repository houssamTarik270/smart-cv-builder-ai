const CV = require('../models/cvModel');

// Hadi hiya l-fonction li ghat-creer CV jdid
exports.createCV = async (req, res) => {
    try {
        const newCV = new CV(req.body);
        const savedCV = await newCV.save();
        res.status(201).json(savedCV);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Ila bghiti t-chouf ga3 l-CVs li m-stockiyin
exports.getAllCVs = async (req, res) => {
    try {
        const cvs = await CV.find();
        res.status(200).json(cvs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};