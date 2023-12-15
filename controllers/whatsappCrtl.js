const enviarMensaje = async (req, res) => {
    const { body } = req;
    const { mensaje, number } = body;

    try {
        const client = await whatsapp();
        await client.sendText(number, mensaje);
        res.json({
            ok: true,
            mensaje: 'Mensaje enviado'
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: 'Error al enviar mensaje'
        });
    }
}


module.exports = {
    enviarMensaje
}