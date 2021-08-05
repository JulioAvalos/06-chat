const { comprobarJWT } = require("../helpers/jwt");

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);

            if(!valido){
                console.log('socket no identificado');
                return socket.disconnect();
            }

            console.log('cliente conectado', uid);
            // todo: validar JWT
            // si el token no es valido, desconectar el socket

            // todo: Saber que usuario esta activo mediante el UID

            // todo: Emitir todos los usuarios conectados

            // todo: Socket join, uid
            
            // todo: escuchar cuando el cliente manda un mensaje
            // mensaje-personal

            // todo: desconectar
            // Marca en la BD qu el usuario se desconecto
            
            // todo: emitir todos los usuarios conectados
            socket.on('disconnect', () => {
                console.log('cliente desconectado', uid);
            });
        });
    }


}


module.exports = Sockets;