const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const puppeteer = require('puppeteer');


app.use(cors()); // cors se utiliza para que el servidor pueda recibir peticiones de otros servidores si no se utiliza no se podra recibir peticiones de otros servidores
app.use(express.json()); // express.json() se utiliza para que el servidor pueda recibir peticiones en formato json

app.use(bodyParser.urlencoded({ extended: false })); // bodyParser.urlencoded() se utiliza para que el servidor pueda recibir peticiones en formato urlencoded
// el formato urlencoded es el que se utiliza en los formularios de html
app.use(express.json({ limit: '50mb' }));

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

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

const port = 3000;


app.post('/api/whatsapp', async (req, res) => {
    const { body } = req;
    const { mensaje, numero } = body;
    const regex = /^9\d+$/;

    if (!regex.test(numero)) {
        return res.status(400).send('Numero no valido');
    }

    if (!mensaje || !numero) {
        return res.status(400).send('Faltan datos');
    }


    const targetNumber = `51${numero}@c.us`;
    const message = `${mensaje}`;

   try{
    await client.sendMessage(targetNumber, message);
    console.log('Mensaje enviado correctamente');
    res.send('Mensaje enviado correctamente');
   } catch (error) {
         console.log('Error al enviar mensaje', error);
         res.send('Error al enviar mensaje');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});