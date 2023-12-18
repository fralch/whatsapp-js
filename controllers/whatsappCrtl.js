const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');


const enviarMensaje = async (req, res) => {
    const { body } = req;
    const { mensaje, numero } = body;

    try {
        // const client = await whatsappjs();
        // await client.sendText(numero, mensaje);
        // res.json({
        //     ok: true,
        //     mensaje: 'Mensaje enviado'
        // });
        const qrcode = require('qrcode-terminal');

        const { Client, LocalAuth } = require('whatsapp-web.js');

        const client = new Client({
          
        });
        

        
         

        client.on('qr', qr => {
            qrcode.generate(qr, {small: true});
        });

        client.on('ready', () => {
            console.log('Client is ready!');
        });

        client.on('ready', async () => {
            console.log('Client is ready!');
            const targetNumber =  `51${numero}@c.us`
            const message = mensaje;
        
            await client.sendMessage(targetNumber, message);
            console.log('Mensaje enviado correctamente');
            res.json({
                ok: true,
                mensaje: 'Mensaje enviado'
            });
          });


        client.initialize();
        
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: error
        });
    }
}


module.exports = {
    enviarMensaje
}