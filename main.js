const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');

const wwebVersion = '2.2412.54';

const client = new Client({
  puppeteer: {
    args: ['--no-sandbox', '--disable-gpu'],
    headless: true,
    executablePath: '/usr/bin/chromium-browser',
  },
  webVersionCache: {
    type: 'remote',
    remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
  },
});

client.on('qr', (qr) => {
  // Generate and scan this code with your phone
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', (msg) => {
  if (msg.body == '!ping') {
    msg.reply('pong');
  }
});

client.initialize();
