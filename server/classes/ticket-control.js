const fs = require('fs');

class Ticket {
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.queue = [];

        let data = require('../data/data.json');
    
        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.queue = data.lastTickets;
        } else {
            this.restartTickets();
        }
    }
    
    nextTicket(){
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.saveData();
        
        return `Ticket ${ this.ultimo }`;
    }

    getTicket(){
        return this.ultimo;
    }

    getLastTickets(){
        return this.queue;
    }

    attendTicket(escritorio){
        if(this.tickets.length === 0){
            return 'No hay tickets'
        }

        let ticketNumber = this.tickets[0].numero;
        this.tickets.shift(); // Elimina el primer ticket del array

        let ticketQueue = new Ticket(ticketNumber, escritorio);

        this.queue.unshift(ticketQueue); // Agregar ticket al inicio del array del queue

        if(this.queue.length > 4){
            this.queue.splice(-1,1); // Borra el ultimo elemento (Desde el index -1 elimina 1 elemento)
        }

        console.log('Ultimos 4 tickets: '+ JSON.stringify(this.queue));     
        this.saveData();

        return ticketQueue;
    }

    restartTickets() {
        this.ultimo = 0;
        this.tickets = [];
        this.queue = [];

        console.log('Se ha inicializado el sistema');
        this.saveData();
    }

    saveData(){
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            lastTickets: this.queue
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}