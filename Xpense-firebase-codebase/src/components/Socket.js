import io from 'socket.io-client';

const ENDPOINT = 'localhost:5000';

export const socket = io(ENDPOINT);


