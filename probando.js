const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const browser = async function () {
    try{
     return browser = await puppeteer.launch({
         headless: 'new',
         executablePath: '/usr/bin/chromium-browser', // Puedes especificar la ruta del ejecutable de Chromium aquí
         args: ['--no-sandbox'], // Agrega esta línea para deshabilitar el sandbox
     });
    }catch(e){
          console.log(e);
    }
 
 }
 
const client = new Client({
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2322.15.html',
    },
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ["--no-sandbox"]
    }
});


client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');

    const targetNumber = '51971619505@c.us'; // Número de teléfono en formato internacional sin el signo '+'
    const message = 'Hola, este es un mensaje de richiman';
    
    // Ahora que el cliente está listo, puedes enviar el mensaje
    client.sendMessage(targetNumber, message);
});

// Manejar eventos de mensajes, etc., si es necesario

client.initialize();
