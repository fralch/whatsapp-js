const { startClient} = require('../mensajear');

const enviarMensaje = async (req, res) => {
    const { body } = req;
    const { mensaje, numero } = body;

    try {
        const client = await startClient();
        // const targetNumber = '51955547121@c.us'; // Número de teléfono en formato internacional sin el signo '+'
        // const message = 'Hola, este es un mensaje de richiman';
        const targetNumber = `51${numero}@c.us`;
        const message = `${mensaje}`;
    
        await client.sendMessage(targetNumber, message);
        console.log('Mensaje enviado correctamente');
        res.status(200).json({
            ok: true,
            mensaje: 'Mensaje enviado correctamente'
        });
      
        
         
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