const CV = require('../models/cvModel'); // T-akd blli s-mīt l-fichier hna match m3a s-mīt model dyalk

const VALID_SECTIONS = ['basics', 'summary', 'experience', 'skills', 'education'];

// ── 1. Create a new CV ───────────────────────────────────────────────────────
exports.createCV = async (req, res) => {
    try {
        const newCV = new CV({
            ...req.body,
            user: req.user // Associate with authenticated user
        });
        const savedCV = await newCV.save();
        res.status(201).json(savedCV);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ── 2. Get all CVs for the user ──────────────────────────────────────────────
exports.getAllCVs = async (req, res) => {
    try {
        const cvs = await CV.find({ user: req.user }); // Only user's CVs
        res.status(200).json(cvs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ── 3. GET CV By ID (NEW) ────────────────────────────────────────────────────
exports.getCVById = async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.id, user: req.user.id });
    if (!cv) return res.status(404).json({ message: 'CV not found.' });
    return res.json(cv);
  } catch (err) {
    console.error('[GET-CV-BY-ID]', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// ── 4. Update Custom Fields per section (NEW) ────────────────────────────────
exports.updateCustomFields = async (req, res) => {
  try {
    const { section, customFields } = req.body;

    if (!VALID_SECTIONS.includes(section))
      return res.status(400).json({ message: `Invalid section. Must be one of: ${VALID_SECTIONS.join(', ')}` });

    if (!Array.isArray(customFields))
      return res.status(400).json({ message: 'customFields must be an array.' });

    // Sanitise: keep only label/value strings
    const sanitised = customFields.map(f => ({
      label: String(f.label || '').slice(0, 100),
      value: String(f.value || '').slice(0, 500),
    }));

    const cv = await CV.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: { [`customFields.${section}`]: sanitised } },
      { new: true, runValidators: true }
    );

    if (!cv) return res.status(404).json({ message: 'CV not found.' });
    return res.json({ message: 'Custom fields updated.', customFields: cv.customFields });
  } catch (err) {
    console.error('[UPDATE-CUSTOM-FIELDS]', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Fonction bach n-jibo l-historique dyal l-CVs
exports.getHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Kan-cherchiw f MongoDB 3la ga3 les CVs li 3ndhom had userId
    // .sort({ createdAt: -1 }) kat-jib jdad huma l-wla
    const history = await CVModel.find({ userId: userId }).sort({ createdAt: -1 });
    
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération de l'historique", error: error.message });
  }
};