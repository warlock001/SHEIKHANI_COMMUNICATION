import { io } from "socket.io-client";
const socket = io.connect("http://192.168.0.103:4000");
export default socket;
