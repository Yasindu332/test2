// server.js

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http); // Socket.io ආරම්භ කිරීම

const PORT = 3000;

// 1. Client-side ගොනුවට සේවය සැපයීම
// මෙය ඔබගේ index.html ගොනුව බ්‍රවුසරයට යවයි
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// 2. Socket.io සම්බන්ධතා හසුරුවන්න
io.on('connection', (socket) => {
  console.log('නව පරිශීලකයෙක් සම්බන්ධ විය.');

  // a. පරිශීලකයෙකු පණිවිඩයක් එව් විට
  socket.on('chat message', (msg) => {
    // එම පණිවිඩය සියලුම සම්බන්ධිත Clients වෙත විකාශනය කරන්න (emit)
    io.emit('chat message', msg);
    console.log('පණිවිඩය: ' + msg);
  });

  // b. පරිශීලකයෙකු විසන්ධි වූ විට
  socket.on('disconnect', () => {
    console.log('පරිශීලකයෙක් විසන්ධි විය.');
  });
});

// 3. සර්වරය ආරම්භ කිරීම
http.listen(PORT, () => {
  console.log(`Server එක http://localhost:${PORT} හි ධාවනය වේ.`);
});