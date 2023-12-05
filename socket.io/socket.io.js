const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


// Configuração do servidor Express
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Quando uma conexão é estabelecida
io.on('connection', (socket) => {
    console.log('Novo usuário conectado');

    //obter o ID da máquina do cliente no Node.js
    const clientIpAddress = socket.handshake.address; // Obtém o endereço IP do cliente
    console.log('Cliente conectado:', clientIpAddress);

    // Quando um novo usuário envia uma mensagem
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg,clientIpAddress); // Envia a mensagem para todos os usuários conectados
    });

    // Quando a conexão é encerrada
    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

// Inicia o servidor na porta desejada
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

