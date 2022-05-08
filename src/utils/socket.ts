import { io } from 'socket.io-client';

const server = 'localhost:2333';
const socket = io('ws://' + server);

export default socket;
