
const Tickets = require('./Tickets.js')

class Sockets {

    constructor( io ) {

        this.io = io;
        this.tickets = new Tickets(100);
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            console.log('Cliente conectado!');
            // Escuchar evento: mensaje-to-server
            socket.on( 'ticket-request', ( _, callback )=>{
                callback( this.tickets.createTicket() )
            })            
            
            socket.on( 'assign-ticket', ( agent, callback) => {
                const ticket = this.tickets.assignTicket( agent )
                callback( ticket )
                this.io.emit( 'last-tickets', {
                    tickets: this.tickets.assigned.getList()
                } )
            })

            
        });
    }


}


module.exports = Sockets;