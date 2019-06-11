$(document).ready(function() {
    var persona = prompt("Ingrese nombre de identificacion");
    if (persona == "") {
        persona = "User-No-Register";
        document.getElementById('nameServer').value = persona;
    } else {
        document.getElementById('nameServer').value = persona;
    }


});


var socket = io.connect();
socket.on('messages', function(data) {
    console.log(data);
    $('#messages').append($('<p>').append($('<b>').text(data.autor)), $('<p>').append($('<b>').text(data.texto)));
});

socket.on('addimage', function(msg) {
    console.log(msg);
    $('#messages').append($('<p>').append($('<b>').text(msg.autor), '<img  width="300px"; height="300px"; src="' + msg.img + '"/>'));
});

socket.on('addvideo', function(msg) {
    console.log(msg);
    $('#messages').append($('<p>').append($('<b>').text(msg.autor), '<video controls autoplay="true" width="300px"; height="300px"; src="' + msg.file + '"/>'));
})

function addMessage(e) {
    var message = {
        autor: document.getElementById('nameServer').value,
        texto: document.getElementById('message').value
    };
    socket.emit('new-message', message);
    clear();
    return false;
};

function clear() {
    $('#message').val('').focus();
};

$(function() {
    $('#uploadfile').bind('change', function(e) {
        var data = e.originalEvent.target.files[0];
        var reader = new FileReader();
        reader.onload = function(evt) {
            var objetos = {
                autor: document.getElementById('nameServer').value,
                img: evt.target.result
            }
            socket.emit('user image', objetos);
        }
        reader.readAsDataURL(data);
    });
});

$(function() {
    $('#uploadvideo').bind('change', function(e) {
        var data = e.originalEvent.target.files[0];
        var reader = new FileReader();
        reader.onload = function(evt) {
            var objetos = {
                autor: document.getElementById('nameServer').value,
                file: evt.target.result
            }
            socket.emit('user video', objetos);
        }
        reader.readAsDataURL(data);
    });
});