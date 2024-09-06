import QRCode from 'qrcode';

export const generateQRCode = (url) => {
    QRCode.toDataURL(url)
      .then((qrCodeUrl) => {
        const newWindow = window.open("", "_blank", "width=500,height=500");
        newWindow.document.write(`
          <html>
            <head>
              <title>QR Code</title>
            </head>
            <body style="display: flex; align-items: center; justify-content: center; height: 100%; margin: 0;">
              <img src="${qrCodeUrl}" alt="QR Code">
              <h2>qr 을 찍어서 나온 이미지를 꾹 눌러 저장해주세요</h2>
            </body>
          </html>
        `);
        newWindow.document.close();
      })
      .catch((err) => {
        console.error('Failed to generate QR code:', err);
      });
  };
