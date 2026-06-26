const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const complaintsRouter = require('./routes/complaints');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/clara-Bassel';

app.use(cors());
app.use(express.json());

app.use('/api/complaints', complaintsRouter);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
