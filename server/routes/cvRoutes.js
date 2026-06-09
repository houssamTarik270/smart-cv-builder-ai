const express    = require('express');
const router     = express.Router();
const cvController = require('../controllers/cvController');
const auth       = require('../middleware/auth');
const CVModel    = require('../models/cvModel'); 

// ── 1. Routes 
router.post('/', auth, cvController.createCV);   
router.get('/',  auth, cvController.getAllCVs);  


router.post('/save', auth, async (req, res) => {
  try {
    const userId = req.user.id; 
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


router.get('/history', auth, async (req, res) => {
  try {
    const userId = req.user.id; 
    
    const history = await CVModel.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cvId = req.params.id;

    
    const deletedCV = await CVModel.findOneAndDelete({ _id: cvId, user: userId });

    if (!deletedCV) {
      return res.status(444).json({ message: "CV introuvable ou vous n'avez pas le droit de le supprimer" });
    }

    res.status(200).json({ message: "CV supprimé avec succès !" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});


router.put('/:id/custom-fields', auth, cvController.updateCustomFields);
router.get('/:id', auth, cvController.getCVById);

module.exports = router;