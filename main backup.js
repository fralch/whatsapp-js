const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const puppeteer = require('puppeteer');

(async () => {
  // Lanzar Puppeteer y WhatsApp Web.js
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/chromium-browser', // Puedes especificar la ruta del ejecutable de Chromium aquí
  });

  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      browserWSEndpoint: (await browser.wsEndpoint()), // Conectar Puppeteer con WhatsApp Web.js
    },
  });

  client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
  });

  client.on('ready', async () => {
    console.log('Client is ready!');
    const targetNumber = '51955547121@c.us'; // Número de teléfono en formato internacional sin el signo '+'
    const message = 'Hola, este es un mensaje de richiman';

    await client.sendMessage(targetNumber, message);
    console.log('Mensaje enviado correctamente');
  });

  // Iniciar WhatsApp Web.js
  client.initialize();

  // Cerrar el navegador al salir
  process.on('SIGINT', () => {
    browser.close();
    process.exit();
  });
})();
