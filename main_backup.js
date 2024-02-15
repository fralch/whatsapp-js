const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const puppeteer = require('puppeteer');


// iniciar servicio de whatsapp web js 

const browser = async function () {
    return browser = await puppeteer.launch({
        headless: 'new',
        executablePath: '/usr/bin/chromium-browser', // Puedes especificar la ruta del ejecutable de Chromium aquí
        args: ['--no-sandbox'], // Agrega esta línea para deshabilitar el sandbox
    });

}

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ["--no-sandbox"]
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready',async () => {
    console.log('Client is ready!');
    const targetNumber = `51971619505@c.us`;
    const message = 'Hola, soy un bot que envía mensajes';
    await client.sendMessage(targetNumber, message);
    console.log('Mensaje enviado correctamente');
});

client.initialize();

