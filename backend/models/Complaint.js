const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'عنوان الشكوى مطلوب'],
    trim: true,
  },
  details: {
    type: String,
    required: [true, 'تفاصيل الشكوى مطلوبة'],
    trim: true,
  },
  impact: {
    type: String,
    required: [true, 'الإحساس أو الضرر الناتج مطلوب'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['لم يتم الحل', 'تم الحل'],
    default: 'لم يتم الحل',
  },
  compensationLink: {
    type: String,
    default: '',
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
