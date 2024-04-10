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

// const client = new Client({
//     webVersionCache: {
//         type: 'remote',
//         remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2410.1.html',
//         },
//     authStrategy: new LocalAuth(),
//     puppeteer: {
//         headless: true,
//         args: ["--no-sandbox"]
//     }
// });


// const client = new Client({
//     webVersionCache: {
//         type: 'remote',
//         remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2402.5.html',
//         },
//     authStrategy: new LocalAuth(),
//     puppeteer: {
//         headless: true,
//         args: ["--no-sandbox"]
//     }
// });

const client = new Client({
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/fralch/CrediWhatsapp-connect/main/wcache.html',
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
});

client.initialize();

const port = 3001;


app.post('/api/whatsapp', async (req, res) => {
    const { body } = req;
    const { mensaje, numero } = body;


    const targetNumber = `51${numero}@c.us`;
    const message = `${mensaje}`;

    await client.sendMessage(targetNumber, message);
    console.log('Mensaje enviado correctamente');
    res.send('Mensaje enviado correctamente');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});