const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');


app.use(cors()); // cors se utiliza para que el servidor pueda recibir peticiones de otros servidores si no se utiliza no se podra recibir peticiones de otros servidores
app.use(express.json()); // express.json() se utiliza para que el servidor pueda recibir peticiones en formato json

app.use(bodyParser.urlencoded({ extended: false })); // bodyParser.urlencoded() se utiliza para que el servidor pueda recibir peticiones en formato urlencoded
// el formato urlencoded es el que se utiliza en los formularios de html
app.use(express.json({ limit: '50mb' }));


const port = 3000;

const rutas = require('./routes/index');
app.use('/api', rutas);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});