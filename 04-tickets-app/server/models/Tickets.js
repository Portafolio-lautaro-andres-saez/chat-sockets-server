
const Ticket = require('./ticket');
const List = require('./queue');


class Tickets{
    constructor(maxTicket){
        this.maxTicket = maxTicket;
        this.lastNumber = 0;
        this.pending = [];
        this.assigned = new List( 13 );
    }

    getLastNumber(){
        this.lastNumber = this.lastNumber % this.maxTicket;
        return ( this.lastNumber++ );
    }

    get lastTickets(){
        return this.assigned;
    }

    createTicket(){
        const ticket = new Ticket( this.getLastNumber() );
        this.pending.push( ticket )
        return ticket;
    }

    assignTicket( agent ){
        
        
        if( this.pending.length == 0 ){
            return null;
        }

        const nextTicket = this.pending.shift();
        nextTicket.agent = agent;
        this.assigned.add( nextTicket )

        return nextTicket;
    }

}

module.exports = Tickets 