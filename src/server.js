const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), (req, res) => {
  const fileUrl = `http://yourdomain.com/uploads/${req.file.filename}`;
  res.json({ imageUrl: fileUrl });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});



