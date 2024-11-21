import QRCode from 'qrcode';
import '../App.css';

const serverHost = process.env.REACT_APP_serverHost;

export const generateQRCode = (url, filename) => {
  QRCode.toDataURL(url)
    .then((qrCodeUrl) => {
      const newWindow = window.open("", "_top", "width=500,height=500");
      newWindow.document.write(`
          <html>
            <head>
              <title>QR Code</title>
              <style>
                .btnStyle1 {
                  letter-spacing: 2px;
                  text-decoration: none;
                  text-transform: uppercase;
                  color: #000;
                  cursor: pointer;
                  border: 3px solid;
                  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
                  user-select: none;
                  -webkit-user-select: none;
                  touch-action: manipulation;
                }

                .btnStyle1:active {
                  box-shadow: 0px 0px 0px 0px;
                  transform: translate(5px, 5px);
                }

                .backBtn {
                  width: 450px;
                  height: 90px;
                  font-size: 45px;
                  font-weight: bold;
                  background-color: #ffc592;
                }
              </style>
            </head>
            <body style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; margin: 0;">
              <img src="${qrCodeUrl}" alt="QR Code">
              <h2>qr 을 찍어서 나온 이미지를 꾹 눌러 저장해주세요</h2>
              <h3>Instagram <span style="color: violet;font-weight:bold;text-decoration:underline;">@k_geonwoo06</span> Tag Me</h3>
              <button class='backBtn btnStyle1' type="button" onclick="window.location.reload();">처음으로</button>
              <form id="email-form" onsubmit="sendMail(event)" style="text-align: center; margin-top: 20px;">
                <input 
                  type="email" 
                  id="email" 
                  placeholder="이메일을 입력하세요" 
                  required 
                  style="padding: 10px; width: 80%; margin-bottom: 10px; border-radius: 5px; border: 1px solid #ccc;"
                />
                <input type="hidden" id="filename" name="filename" value="${filename}">
                <br />
                <button 
                  type="submit" 
                  style="padding: 10px 20px; font-size: 16px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
                  이메일 보내기
                </button>
              </form>
              <script>
                function sendMail(event) {
                  event.preventDefault();  // 폼 제출을 막고
                  
                  const email = document.getElementById('email').value;  // 이메일 값 가져오기
                  const filename = document.getElementById('filename').value;
                  
                  fetch(\`${serverHost}:3001/send-mail\`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ toyou: email,filename: filename }),  // 이메일을 서버로 전송
                  })
                  .then(response => response.json())
                  .then(data => {
                    alert('이메일이 전송되었습니다!');
                    window.location.reload();
                  })
                  .catch(error => alert('이메일 전송 실패!'));
                }
              </script>
              </body>
          </html>
          
        `);
      newWindow.document.close();
    })
    .catch((err) => {
      console.error('Failed to generate QR code:', err);
    });
};
