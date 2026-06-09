const express    = require('express');
const router     = express.Router();
const cvController = require('../controllers/cvController');
const auth       = require('../middleware/auth');
const CVModel    = require('../models/cvModel'); 

// ── 1. Routes l-3adiyin w Jdad (Khasshom ykouno l-foq) ──
router.post('/', auth, cvController.createCV);   
router.get('/',  auth, cvController.getAllCVs);  

// 🌟 ROUTE SAUVEGARDE JDIDA
router.post('/save', auth, async (req, res) => {
  try {
    const userId = req.user.id; // Kay-ji direct mn l-Token bghdl 'auth'
    const { cvData } = req.body;

    const newCV = new CVModel({
      user: userId, 
      cvData: cvData
    });

    await newCV.save();
    res.status(201).json({ message: "CV sauvegardé avec succès", cv: newCV });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// 🌟 ROUTE HISTORIQUE JDIDA
router.get('/history', auth, async (req, res) => {
  try {
    const userId = req.user.id; // Kay-ji direct mn l-Token bghdl 'auth'
    
    const history = await CVModel.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});
// 🌟 ROUTE DYAL MAS7 (DELETE) - Zid hadi t7t route dyal history direct
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cvId = req.params.id;

    // Kan-mshou l-CV ghir ila kān dyal l-user li m-connecté bdabt
    const deletedCV = await CVModel.findOneAndDelete({ _id: cvId, user: userId });

    if (!deletedCV) {
      return res.status(444).json({ message: "CV introuvable ou vous n'avez pas le droit de le supprimer" });
    }

    res.status(200).json({ message: "CV supprimé avec succès !" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ── 2. Routes li fihom :id (DIMA KHASSHOM YKOUNO HOMA L-LKHRIN) ──
router.put('/:id/custom-fields', auth, cvController.updateCustomFields);
router.get('/:id', auth, cvController.getCVById);

module.exports = router;