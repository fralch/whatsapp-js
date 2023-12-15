const express = require('express');
const router = express.Router();

const { enviarMensaje } = require('../controllers/whatssapp');

router.post('/', enviarMensaje);

module.exports = router;