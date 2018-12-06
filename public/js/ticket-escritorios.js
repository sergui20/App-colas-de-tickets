//Client
var socket = io();

// Obteniendo el parametro escritorio de la URL
var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

// Actualizando el escritorio
var escritorio = searchParams.get('escritorio');

let title = document.getElementById('title');
title.innerText = `Escritorio ${escritorio}`;

// Atendiendo los tickets
let attendButton = document.getElementById('attend-button');
let attending = document.getElementById('attend-ticket');
let text = document.getElementById('atendiendo-a');

attendButton.addEventListener('click', function(){
    socket.emit('attendTicket', { escritorio }, function(resp){
        if(resp === 'No hay tickets'){
            text.innerText = resp;
            attending.innerText = '';
            alert(resp);
            return;
        }

        console.log('Respuesta: ' + JSON.stringify(resp));
        attending.innerText = resp.numero;
    })
})