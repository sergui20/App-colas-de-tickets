let botonTicket = document.getElementById('new-ticket');
let label = document.getElementById('lblNuevoTicket');

// Estableciendo la conexion
var socket = io();

socket.on('connect', function(){
    console.log('Servidor conectado');
});

socket.on('disconnect', function(){
    console.log('Servidor desconectado');
});

botonTicket.addEventListener('click', function(){
    socket.emit('nextTicket', null, function(labelText){
        label.innerText = labelText;
    })
});

// Mostrar el ultimo ticket en la pagina
socket.on('getTickets', function(data){
    label.innerText = `Ticket ${JSON.stringify(data.lastTicket)}`;
})