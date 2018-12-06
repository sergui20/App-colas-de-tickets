// Client-side
var socket = io();

let spanTicket1 = document.getElementById('lblTicket1');
let spanDesktop1 = document.getElementById('lblEscritorio1');

let spanTicket2 = document.getElementById('lblTicket2');
let spanDesktop2 = document.getElementById('lblEscritorio2');

let spanTicket3 = document.getElementById('lblTicket3');
let spanDesktop3 = document.getElementById('lblEscritorio3');

let spanTicket4 = document.getElementById('lblTicket4');
let spanDesktop4 = document.getElementById('lblEscritorio4');

spanTickets = [spanTicket1, spanTicket2, spanTicket3, spanTicket4];
spanDesktops = [spanDesktop1, spanDesktop2, spanDesktop3, spanDesktop4];

socket.on('getTickets', function(data){
    updateTickets(data.lastTickets)
});

// Escuchando socket para actualizar la pantalla publica
socket.on('publicScreen', function(data){
    var audio = new Audio('../audio/new-ticket.mp3');
    audio.play();

    updateTickets(data.lastTickets)
});

function updateTickets(lastTickets){
    for(i=0; i<lastTickets.length; i++){
        spanTickets[i].innerText = `Ticket ${lastTickets[i].numero}`;
        spanDesktops[i].innerText = `Escritorio ${lastTickets[i].escritorio}`;
    }
}