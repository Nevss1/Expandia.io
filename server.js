const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/prototype.html'); // Serve o arquivo HTML
});

io.on('connection', (socket) => {
    console.log('Novo jogador conectado');

    socket.on('disconnect', () => {
        console.log('Jogador desconectado');
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
