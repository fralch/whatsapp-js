const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const puppeteer = require('puppeteer');


// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // Ruta donde se guardarán las fotos
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) // Nombre del archivo en el servidor
    }
  });  
  const upload = multer({ storage: storage });


app.use(cors()); // cors se utiliza para que el servidor pueda recibir peticiones de otros servidores si no se utiliza no se podra recibir peticiones de otros servidores
app.use(express.json()); // express.json() se utiliza para que el servidor pueda recibir peticiones en formato json

app.use(bodyParser.urlencoded({ extended: false })); // bodyParser.urlencoded() se utiliza para que el servidor pueda recibir peticiones en formato urlencoded
app.use(bodyParser.json());
// el formato urlencoded es el que se utiliza en los formularios de html
app.use(express.json({ limit: '50mb' }));

// iniciar servicio de whatsapp web js 

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

app.get('/', (req, res) => {
    res.send('Hello World local!')
});

app.post('/api/whatsapp',upload.single('imagen'), async (req, res) => {
    const imgURL = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
    console.log(imgURL);
    const message = req.body.message;
    const phone = req.body.phone;



    // const { body } = req;
    // const { message, phone } = body;
    const regex = /^9\d+$/;

    
    if (!message || !phone) {
        console.log('Faltan datos');
        const rpt = {
            "status": "error",
            "message": "Error al enviar el mensaje. Falta un parámetro.",
            "code": "PARAMETER_NOT_FOUND"
        }; 
        return res.status(400).send(rpt);
    }
    if(message.trim() === '' ){
        console.log('Faltan datos');
        const rpt = {
            "status": "error",
            "message": "Error al enviar el mensaje. El mensaje está vacío.",
            "code": "EMPTY_MESSAGE"
          }
        return res.status(400).send(rpt);
    }

    if(phone.trim() === '' ){
        console.log('Faltan datos');
        const rpt = {
            "status": "error",
            "message": "Error al enviar el mensaje. El número de teléfono está vacío.",
            "code": "EMPTY_PHONE"
          }
        return res.status(400).send(rpt);
    }

    if (!regex.test(phone)) {
        console.log('phone no valido');
        const rpt = {
            "status": "error",
            "message": "Error al enviar el mensaje. El número de teléfono es inválido.",
            "code": "INVALID_PHONE_NUMBER"
          }; 
        return res.status(400).send(rpt);
    }

    const targetNumber = `51${phone}@c.us`;
    const message_ = `${message}`;

    const imageData = fs.readFileSync('frank.jpg', { encoding: 'base64' });
    const media = new MessageMedia('image/jpeg', imageData, 'image.jpg');

    const caption = message_;

    try {
        const chat = await client.getChatById(targetNumber);
        await chat.sendMessage(media, { caption });

        const rpt = {
            "status": "success",
            "message": `El mensaje fue enviado exitosamente a +51${phone}.`,
        }; 
        console.log('Mensaje enviado correctamente');
        res.send(rpt);
   } catch (error) {
         console.log('Error: ', error);
         const rpt ={
            "status": "error",
            "message": "Error al enviar el mensaje.",
            "code": "SEND_MESSAGE_ERROR"
          };
        res.status(500).send(rpt);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});