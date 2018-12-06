const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('nextTicket', function(data, callback){
        let nextTicket = ticketControl.nextTicket()
        console.log('El siguiente ticket es: '+ nextTicket)

        callback(nextTicket)
    })

    client.emit('getTickets', {
        lastTicket: ticketControl.getTicket(),
        lastTickets: ticketControl.getLastTickets()
    })

    client.on('attendTicket', function(data, callback){
        if(!data.escritorio){
            return 'El escritorio es necesario'
        }

        let resp = ticketControl.attendTicket(data.escritorio);
        callback(resp);

        //Actualizar pantalla publica con los ultimos 4 tickets
        client.broadcast.emit('publicScreen', {
            lastTickets: ticketControl.getLastTickets()
        })
    })

    client.on('loadTickets', function(data, callback){
        let lastTickets = ticketControl.getLastTickets();

        callback(lastTickets);
    })
});