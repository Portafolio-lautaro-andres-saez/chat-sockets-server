const BandList = require('./band-list');


class Sockets {

    constructor( io ) {

        this.io = io;
        this.bandList = new BandList()
        this.socketEvents();
        

    }

    updateClientsBandList(){
        this.io.emit( 'current-bands', this.bandList.getBands() )
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('====================================');
            console.log( 'Cliente conectado!' );
            console.log('====================================');
            //Emitir al cliente conectado todas las bandas
            this.updateClientsBandList()
            //votaciones
            socket.on( 'band-vote', ( { id } ) =>{
                this.bandList.increaseVotes( id )
                this.updateClientsBandList()
            } )
            
            //cambiar el nombre de una banda
            socket.on( 'change-band-name', ( { id, newName } ) =>{
                this.bandList.changeBandName( id, newName )
                this.updateClientsBandList()
            } )

            //delete band
            socket.on( 'delete-band', ( {id} ) =>{
                this.bandList.removeBand( id )
                this.updateClientsBandList(); 
            } )

            //add band
            socket.on( 'add-band', ({ newBandName }) =>{
                this.bandList.addBand( newBandName ); 
                this.updateClientsBandList()
            } )
        });

    
    }


}


module.exports = Sockets;