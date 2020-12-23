
const { v4: uuid } = require('uuid')

class Ticket {

    constructor( lastNumber ){
        this.id = uuid();
        this.number = lastNumber + 1;
        
        this.agent = null
    }


}

module.exports = Ticket;