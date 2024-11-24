import QRCode from 'qrcode'; // QR 코드 생성을 위한 라이브러리

const serverHost = process.env.REACT_APP_serverHost; // 서버 호스트 주소를 환경 변수에서 가져옴

// QR 코드 생성 함수
export const generateQRCode = (url, filename) => {
  // 주어진 URL로 QR 코드를 생성
  QRCode.toDataURL(url)
    .then((qrCodeUrl) => {
      // 새로운 창을 열어 QR 코드 및 기타 정보를 표시
      const newWindow = window.open("", "_top", "width=500,height=500");

      // 새 창에 HTML 작성
      newWindow.document.write(`
        <html>
          <head>
            <title>QR Code</title>
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                background-color: #004225;
                color: #ffffff;
                font-family: 'Arial', sans-serif;
              }
              img {
                max-width: 300px;
                height: auto;
                border: 5px solid #ffd700;
                border-radius: 15px;
                margin-bottom: 20px;
                box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
              }
              h2 {
                font-size: 24px;
                margin: 10px 0;
                text-align: center;
              }
              h3 {
                font-size: 20px;
                margin: 5px 0;
                text-align: center;
              }
              h3 span {
                color: violet;
                font-weight: bold;
                text-decoration: underline;
              }
              .btnStyle1 {
                background-color: #c0392b;
                color: #ffffff;
                border: 2px solid #ffd700;
                border-radius: 15px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                cursor: pointer;
                transition: all 0.3s ease-in-out;
                font-size: 20px;
                font-weight: bold;
                padding: 10px 20px;
              }
              .btnStyle1:hover {
                background-color: #ffd700;
                color: #004225;
                transform: scale(1.05);
                box-shadow: 0 8px 20px rgba(255, 215, 0, 0.7);
              }
              .btnStyle1 span {
                position: relative;
                z-index: 1;
              }
            </style>
          </head>
          <body>
            <img src="${qrCodeUrl}" alt="QR Code">
            <h2>qr 을 찍어서 나온 이미지를 꾹 눌러 저장해주세요</h2>
            <h3>Instagram <span>@k_geonwoo06</span> Tag Me</h3>
            
            <form id="email-form" onsubmit="sendMail(event)">
              <input 
                type="email" id="email" 
                placeholder="이메일을 입력하세요" required/>
              <input type="hidden" id="filename" name="filename" value="${filename}">
              <br/>
              <button type="submit">이메일로 저장하기</button>
            </form>
            <button class='backBtn btnStyle1' type="button" onclick="window.location.reload();">처음으로</button>
            <script>
              function sendMail(event) {
                event.preventDefault();
                const email = document.getElementById('email').value;
                const filename = document.getElementById('filename').value;
                fetch(\`${serverHost}:3001/send-mail\`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ toyou: email, filename: filename }),
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
      newWindow.document.close(); // 새 창 내용 마무리
    })
    .catch((err) => {
      console.error('Failed to generate QR code:', err); // QR 코드 생성 실패 시 에러 로그 출력
    });
};
