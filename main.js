const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

// client.on('message', message => {
//     console.log('Número del remitente:', message.from);
// 	if(message.body === '!ping') {
// 		message.reply('pong');
// 	}
// });
client.on('ready', async () => {
    console.log('Cliente listo');
    const targetNumber = '51955547121@c.us'; // Número de teléfono en formato internacional sin el signo '+'
    const message = 'Hola, este es un mensaje de richiman';

    await client.sendMessage(targetNumber, message);
    console.log('Mensaje enviado correctamente');
});


client.initialize();
 