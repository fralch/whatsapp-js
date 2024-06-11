const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const webversion = '2.2412.54v2';

const client = new Client({
  puppeteer: {
    args: ['--no-sandbox', '--disable-gpu'],
    headless: true,
    executablePath: '/usr/bin/chromium-browser',
  },
  authStrategy: new LocalAuth({
    dataPath: 'auth',
  }),

  webVersion: webversion,
  webVersionCache: {
    type: 'remote',
    remotePath: `https://raw.githubusercontent.com/guigo613/alternative-wa-version/main/html/${webversion}.html`,
  },
  restartOnAuthFail: true,
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('authenticated', () => {
  console.log('Client is authenticated!');
});

client.on('auth_failure', (msg) => {
  console.error('Authentication failure', msg);
});

client.on('message', (msg) => {
  console.log('MESSAGE RECEIVED', msg);
  if (msg.body === '!ping') {
    msg.reply('pong');
  }
});

client
  .initialize()
  .then(() => {
    console.log('Client initialized successfully');
  })
  .catch((err) => {
    console.error('Error initializing client', err);
  });
