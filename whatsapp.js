const express = require('express');
const multer = require('multer');

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '1mb' }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

client
  .initialize()
  .then(() => {
    console.log('Client initialized successfully');
  })
  .catch((err) => {
    console.error('Error initializing client', err);
  });

const sendMsg = async (targetNumber, message, media) => {
  console.log('Sending message...');
  const caption = message;
  try {
    const chat = await client.getChatById(targetNumber);
    await chat.sendMessage(media, { caption });
    const numero = targetNumber.replace(/@c\.us/g, '');
    console.log('Mensaje enviado correctamente');
    return {
      status: 'success',
      message: `La imagen fue enviado exitosamente a +${numero}.`,
    };
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

const sendMsgJson = async (targetNumber, message) => {
  console.log('Sending message json...');
  try {
    await client.sendMessage(targetNumber, message);
    console.log('Message sent successfully');
    const numero = targetNumber.replace(/@c\.us/g, '');
    return {
      status: 'success',
      message: `El mensaje fue enviado exitosamente a +${numero}.`,
    };
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
app.get('/', (req, res) => {
  res.send('Hello World whatsapp-connect!');
});

app.post(
  '/api/whatsapp/text-image',
  upload.single('image'),
  async (req, res) => {
    const { message, phone } = req.body;
    const targetNumber = `51${phone}@c.us`;
    const imgData = req.file.buffer.toString('base64');
    const media = new MessageMedia('image/jpeg', imgData, 'image.jpg');

    try {
      const msg = await sendMsg(targetNumber, message, media);
      res.json(msg);
    } catch (error) {
      res.status(500).json({ error: 'Error sending message' });
    }
  }
);

app.post('/api/whatsapp/text', async (req, res) => {
  const { message, phone } = req.body;
  const targetNumber = `51${phone}@c.us`;

  try {
    const msg = await sendMsgJson(targetNumber, message);

    res.json(msg);
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`REST API server listening on port ${PORT}`);
});
