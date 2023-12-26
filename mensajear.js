const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');
const puppeteer = require('puppeteer');

const startClient = async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        executablePath: '/usr/bin/chromium-browser', // Puedes especificar la ruta del ejecutable de Chromium aquí
        args: ['--no-sandbox'], // Agrega esta línea para deshabilitar el sandbox
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

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    await client.initialize();

    return client;
}



module.exports = {
    startClient
}
 