const express = require('express');
const postRouter = require('./posts/post-router.js');


const server = express();

server.use(express.json());
server.use('/api/posts', postRouter);


// endpoints

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/favicon.ico', (req, res) => {
    res.status(204);
});



module.exports = server;