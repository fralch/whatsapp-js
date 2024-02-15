const qrcode = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js');
const puppeteer = require('puppeteer');
const fs = require('fs');

// Iniciar servicio de WhatsApp Web JS

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

client.on('qr', async qr => {
    // Generar QR y guardarlo como imagen
    const qrImageFilePath = 'qrcode.png';
    await qrcode.toFile(qrImageFilePath, qr, { small: true });
    console.log(`QR Code generado y guardado como ${qrImageFilePath}`);
});

client.on('ready', async () => {
    console.log('Client is ready!');
    const targetNumber = `51971619505@c.us`;
    const message = 'Hola, soy un bot que envía mensajes';
    await client.sendMessage(targetNumber, message);
    console.log('Mensaje enviado correctamente');
});

client.initialize();
