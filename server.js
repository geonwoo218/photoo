const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const dotenv = require('dotenv').config();

// CORS 설정
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',  // React 앱의 주소
  methods: ['GET', 'POST'],  // 허용할 HTTP 메소드
  allowedHeaders: ['Content-Type'],  // 허용할 헤더
}));

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
    const fileUrl = `${process.env.serverHost}:3001/uploads/${req.file.filename}`;
    console.log(`reqfile: ${req.file.filename}`)
    res.json({ imageUrl: fileUrl, filename: req.file.filename });
  } else {
    res.status(400).json({ error: 'File upload failed' });
  }
});



//이메일 전송 엔드포인트
app.post("/send-mail", async (req, res) => {
  const { toyou, filename } = req.body;
  //smtp 설정
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.USER_EMAIL}`,
      pass: `${process.env.USER_PASS}`,
    },
  });

  console.log(`filename : ${filename}`)

  const localFilePath = path.join(__dirname,'uploads', filename);
  console.log("localpath = " + localFilePath)
  const mailOptions = {
    from: `${process.env.USER_EMAIL}`,
    to: toyou,
    subject: "여러분의 소중한 사진이 날아왔어요!",
    text: "창의경영고등학교 it 은행제 페스티벌의 추억을 잘 간직해주세요!",
    attachments: [
      {
        filename:'gift.png',
        path:localFilePath,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ success: 'sex' });
  } catch (err) {
     res.status(500).json({ failed: 'unsex' });
  }

})





// 서버 실행
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
