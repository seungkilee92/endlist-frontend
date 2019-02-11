import { Socket } from "phoenix"

let socket = new Socket("ws://localhost:4000/socket",{
    params: {token: localStorage.getItem("token")},
    logger: (kind, msg, data) => { console.log(kind + ': ' + msg, data) }
})
socket.connect()

export default socket