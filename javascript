const loginForm = document.getElementById('login-form');
const chatContainer = document.getElementById('chat-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const chatMessages = document.getElementById('chat-messages');
const username = document.getElementById('username');
let token;

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    socket.emit('login', { username, password });
});

socket.on('loginSuccess', (token) => {
    loginForm.style.display = 'none';
    chatContainer.style.display = 'block';
    token = token;
});

socket.on('loginFailed', () => {
    alert('Invalid username or password');
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('sendMessage', { message, username, token });
    messageInput.value = '';
});

socket.on('newMessage', (data) => {
    const message = document.createElement('div');
    message.textContent = `${data.username}: ${data.message}`;
    chatMessages.appendChild(message);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});


Backend (Server-side);


//* server.js *//

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('(link unavailable)')(server);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const aes256 = require('aes256');

const users = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New connection established');

    socket.on('login', (data) => {
        const { username, password } = data;
        const user = users.find((user) => user.username === username);

        if (!user) {
            socket.emit('loginFailed');
            return;
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (!isValidPassword) {
            socket.emit('loginFailed');
            return;}
        }

        ,);const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });
        socket.emit('loginSuccess', token);
    });

    socket.on('sendMessage', (data) => {
        const { message, username, token } = data;})
