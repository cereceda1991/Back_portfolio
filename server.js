const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3001;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

app.use(cors({
    origin: FRONTEND_ORIGIN,
    methods: ['GET', 'POST'],
}));

app.get('/', (req, res) => {
    res.send('¡El servidor WebSocket está en línea!');
});

io.on('connection', (socket) => {
    const { id } = socket;
    console.log('Usuario conectado:', id);

    socket.on('notification', ({ message, senderName }) => {
        console.log('Notificación recibida de:', senderName);
        console.log('Mensaje:', message);

        io.emit('newNotification', { message, senderName });
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', id);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor en línea en el puerto ${PORT}`);
});
