const { startClient} = require('../mensajear');
const express = require('express');
const app = express();

const enviarMensaje = async (req, res) => {
    const { body } = req;
    const { mensaje, numero } = body;

   
        const client = await startClient();
        // const targetNumber = '51955547121@c.us'; // Número de teléfono en formato internacional sin el signo '+'
        // const message = 'Hola, este es un mensaje de richiman';
        const targetNumber = `51${numero}@c.us`;
        const message = `${mensaje}`;
    
        await client.sendMessage(targetNumber, message);
        console.log('Mensaje enviado correctamente');
        
        await cerrarClient(client); 

        function cerrarClient(client) {   
          // cerrar client de whatsapp js  despues de 5 segundos
          console.log('cerrando client de whatsapp js  despues de 5 segundos')
          setTimeout(() => {
              client.destroy()
              .then(() => {
                  console.log('Client cerrado');
                  res.json({
                      ok: true,
                      msg: 'Client cerrado'
                  });
              }); 
          }, 20000)   
      
          
        }

        
        
       
        
       
    
   
}



module.exports = {
    enviarMensaje
}