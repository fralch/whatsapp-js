const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const puppeteer = require('puppeteer');

// iniciar servicio de whatsapp web js 
const browser = async function () {
    return await puppeteer.launch({
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
 
client.on('ready', async () => {
    console.log('Client is ready!');
    const targetNumber = `51955547121@c.us`;

    // Leer la imagen y convertirla a base64
    const imageData = fs.readFileSync('frank.jpg', { encoding: 'base64' });

    // Crear una instancia de MessageMedia con los datos en base64
    const media = new MessageMedia('image/jpeg', imageData, 'image.jpg');

    const caption = 'Hola, soy un bot que envía imágenes';

    try {
        // Obtener el chat por el ID y enviar la imagen
        const chat = await client.getChatById(targetNumber);
        await chat.sendMessage(media, { caption });

        console.log('Mensaje enviado correctamente');
    } catch (error) {
        console.log('Error: ', error);
    }
});

client.initialize();
