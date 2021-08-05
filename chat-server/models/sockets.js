const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje } = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

            const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);

            if(!valido){
                console.log('socket no identificado');
                return socket.disconnect();
            }

            await usuarioConectado(uid);

            // unir al usuario a una sala de socket.io
            socket.join(uid); 

            // todo: validar JWT
            // si el token no es valido, desconectar el socket

            // todo: Saber que usuario esta activo mediante el UID

            // todo: Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios());

            // todo: Socket join, uid
            
            // todo: escuchar cuando el cliente manda un mensaje
            socket.on('mensaje-personal', async (payload) => {
                const mensaje = await grabarMensaje(payload);
                this.io.to(payload.para).emit('mensaje-personal', mensaje);
                this.io.to(payload.de).emit('mensaje-personal', mensaje);
            });
            // mensaje-personal

            // todo: desconectar
            // Marca en la BD qu el usuario se desconecto
            
            // todo: emitir todos los usuarios conectados
            socket.on('disconnect', async() => {
                await usuarioDesconectado(uid);
                this.io.emit('lista-usuarios', await getUsuarios());
            });
        });
    }


}


module.exports = Sockets;