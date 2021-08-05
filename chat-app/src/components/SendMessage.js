import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";

export const SendMessage = () => {
  const [mensaje, setMensaje] = useState("");
  const { auth } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { chatState } = useContext(ChatContext);

  const onChange = ({ target }) => {
    setMensaje(target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if(mensaje.length === 0) {
      return;
    }
    console.log(mensaje);
    setMensaje('');

    // todo: emitir un evento de sockets para enviar el mensaje
    // {
    //   de: // uid del usuario enviando el mensaje
    //   para: // uid del usuario que recibe el mensaje
    //   mensaje: //lo que se va enviar
    // }

    socket.emit('mensaje-personal', {
      de: auth.uid,
      para: chatState.chatActivo,
      mensaje: mensaje
    });

    // todo: hacer dispatch del mensaje...

  }

  return (
    <form onSubmit={onSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
            value={mensaje}
            onChange={onChange}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};
