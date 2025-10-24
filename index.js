const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('接続:', socket.id);

  socket.on('chat', (msg) => {
    io.emit('chat', msg);
  });

  socket.on('disconnect', () => {
    console.log('切断:', socket.id);
  });
});

app.get('/', (req, res) => {
  res.send('ライブコメントサーバー稼働中');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`サーバー起動中: http://localhost:${PORT}`);
});
