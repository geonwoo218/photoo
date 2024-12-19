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
                  width: 100%;
                  height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                  margin: 0;
                  background-color: #004225;
                  color: #ffffff;
                  font-family: 'Arial', sans-serif;
                  box-sizing: border-box;
                   background-image: url('images/christmas.png');
                  background-repeat: repeat-x;
                  background-size:500px;
              }
              section{
                  width: 85%;
                  height: 600px;
                  box-shadow: 0px 0px 20px #a7a88b;
                  position: relative;
                  margin-top: 40px;
              }
              .top{
                  width: 100%;
                  height: 80px;
                  float: left;
                  display: flex;
                  justify-content: space-around;
                 
              }
              .left{
                  width: 47%;
                  height: calc(100% - 80px);
                  float: left;
                  display: flex;
                  justify-content: center;
                  flex-direction: column;
                  align-items: center;
                  margin-left: 20px;
              }

              img {
                  width: 250px;
                  height: auto;
                  border: 5px solid #ffd700;
                  border-radius: 15px;
                  margin-bottom: 20px;
                  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
              }
              .right{
                  width: 47%;
                  height: calc(100% - 80px);
                  float: right;
                  position: relative;
                  
              }
              #email-form{
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  flex-direction: column;
                  align-items: center;
              }
              #email {
                  width: 80%;
                  height: 60px;
                  padding-left: 20px;
                  font-size: 22px;
                  background-color: #ffffff; /* 밝은 배경으로 대비 */
                  color: #333333; 
                  border: 4px solid #ffd700; 
                  border-radius: 10px; 
                  outline: none; 
                  transition: all 0.3s ease; 
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
              }

              #email:focus {
                  border-color: #c0392b; 
                  box-shadow: 0 0 10px #c0392b; 
              }

              #email::placeholder {
                  color: #999999;
                  font-style: italic; 
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
              footer{
                  width: 85%;
                  height: 150px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
              }
              footer span{
                  color: #c0392b;
                  text-decoration: underline;
              }
              .homeBtn{
                  width: 200px;
              }
            </style>
          </head>
          <body>
            <section>
              <div class="top">
                  <h2>QR코드로 받기</h2>
                  <h2>이메일로 받기</h2>
              </div>
              <div class="left">
                  <img src="${qrCodeUrl}" alt="QR Code" id="qrImg">
                  <h2>qr 을 찍어서 나온 이미지를 꾹 눌러 저장해주세요</h2>
                  <h3>아래 와이파이로 연결 필수!!</h3>
                  <p>wi-fi: IT도제실 &nbsp;&nbsp; password: 11111111 </p>
              </div>
              <div class="right">
                  <form id="email-form" onsubmit="sendMail(event)">
                      <input type="email" id="email" placeholder="이메일을 입력하세요" required />
                      <input type="hidden" id="filename" name="filename" value="${filename}">
                      <br />
                      <button type="submit" class="btnStyle1" id="emailBtn">이메일로 사진 보내기</button>
                  </form>
              </div>
          </section>
          <footer>
              <h3>Instagram <span>@k_geonwoo06</span> Tag Me</h3>
              <button class='btnStyle1 homeBtn' type="button" onclick="window.location.reload();">처음으로</button>
          </footer>  
          <script>
              function sendMail(event) {
                event.preventDefault();
                const emailBtn =  document.getElementById('emailBtn');
                emailBtn.textContent = '이메일로 사진 전송 중..';
                emailBtn.disabled = true;
                const email = document.getElementById('email').value;
                const filename = document.getElementById('filename').value;
                fetch(\`${serverHost}:3001/send-mail\`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ toyou: email, filename: filename }),
                })
                .then(response => response.json())
                .then(data => {
                  alert('이메일로 사진이 전송되었습니다!');
                  emailBtn.textContent = '이메일로 사진 보내기';
                  document.getElementById('email').value = "";
                  emailBtn.disabled = false
                })
                .catch(error => {
                  alert('이메일 전송 실패!')
                  emailBtn.textContent = '이메일로 사진 보내기';
                  emailBtn.disabled = false;
                  });
                
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
