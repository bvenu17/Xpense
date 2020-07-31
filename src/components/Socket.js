import io from 'socket.io-client';

const ENDPOINT = 'https://xpense-server.herokuapp.com/';

export const socket = io(ENDPOINT);