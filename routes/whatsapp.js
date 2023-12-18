const express = require('express');
const router = express.Router();

const { enviarMensaje } = require('../controllers/whatsappCrtl');

router.post('/', enviarMensaje);

module.exports = router;