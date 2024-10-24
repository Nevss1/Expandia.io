const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve arquivos estáticos da pasta atual
app.use(express.static(path.join(__dirname)));

// Serve o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'prototype.html')); // Certifique-se de que o arquivo HTML está corretamente nomeado
});

// Lida com as conexões do Socket.io
io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    socket.on('updateGrid', (grid) => {
        socket.broadcast.emit('updateGrid', grid);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Inicie o servidor na porta 3000
server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
