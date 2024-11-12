const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

// CORS 설정
app.use(cors());

// 업로드 폴더 및 파일 이름 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // 파일 이름을 원본 파일 이름으로 설정
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// 정적 파일 서빙 설정
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// /upload 경로에 대한 POST 요청 처리
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    const fileUrl = `http://192.168.1.10:3001/uploads/${req.file.filename}`;
    res.json({ imageUrl: fileUrl });
  } else {
    res.status(400).json({ error: 'File upload failed' });
  }
});

// 서버 실행
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
