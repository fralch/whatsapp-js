const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});
 


// (async () => {
//     client.on('qr', qr => {
//         qrcode.generate(qr, { small: true });
//     });

//     client.on('ready', () => {
//         console.log('Client is ready!');
//     });

//     client.initialize();

// })();

const startClient = async () => {
    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    await client.initialize();

    return client;
}

function sendTextMessage(number, message) {
    client.sendMessage(number, message)
    .then(response => {
        console.log(response);
    })
}

module.exports = {
    startClient,
    sendTextMessage
}
 