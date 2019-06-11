var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

io.sockets.on('connection', function(socket) {
    console.log("El chat tiene visitas");
    //socket.emit('messages', message);

    socket.on('new-message', function(data) {
        io.sockets.emit('messages', {
            autor: data.autor,
            texto: data.texto
        });
    });


    socket.on('user image', function(data) {
        console.log(data)
        io.sockets.emit('addimage', {
            autor: data.autor,
            img: data.img
        });
    });

    socket.on('user video', function(data) {
        console.log(data)
        io.sockets.emit('addvideo', {
            autor: data.autor,
            file: data.file
        });
    });


});

server.listen(3000, function() {
    console.log("conexion exitosa al servidor! http://localhost:3000");
});