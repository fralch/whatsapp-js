const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
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
