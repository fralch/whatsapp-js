const { sendTextMessage} = require('../mensajear');

const enviarMensaje = async (req, res) => {
    const { body } = req;
    const { mensaje, numero } = body;

    try {
        
        sendTextMessage(numero, mensaje)
        .then(response => {
            res.status(200).json({
                ok: true,
                mensaje: response
            });
        })
        
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