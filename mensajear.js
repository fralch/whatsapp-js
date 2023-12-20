const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();


(async () => {
    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.initialize();
})();

function sendTextMessage(number, message) {
    client.sendMessage(number, message)
    .then(response => {
        console.log(response);
    })
}

module.exports = {
    sendTextMessage
}
 