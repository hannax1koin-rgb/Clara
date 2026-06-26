const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { title, details, impact } = req.body;
  if (!title || !details || !impact) {
    return res.status(400).json({ message: 'جميع الحقول مطلوبة' });
  }
  try {
    const complaint = new Complaint({ title, details, impact });
    const saved = await complaint.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { status, compensationLink } = req.body;
    const update = {};
    if (status) update.status = status;
    if (compensationLink !== undefined) update.compensationLink = compensationLink;

    const updated = await Complaint.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: 'الشكوى غير موجودة' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
