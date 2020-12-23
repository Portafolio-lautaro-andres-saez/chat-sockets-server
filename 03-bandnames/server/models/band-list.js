const Band = require("./band");

class BandList{

    constructor(){
        this.bands = [
            new Band( 'Metalica' ),
            new Band( 'Ratones pananoicos' ),
            new Band( 'Bon Jovi' ),
            new Band( 'Helvetica' )
        ]
    }

    getBands(){
        return this.bands
    }

    searchBand( name ){
        const bandsNames = this.bands.map( (band) => band.name )
        return bandsNames.includes( name )
    }

    addBand( name ){
        if( this.searchBand( name )  ){
            return
        }
        this.bands.push( new Band( name ) );
    }

    removeBand( id ){
        this.bands = this.bands.filter( band => band.id !== id )
    }

    increaseVotes( id ){
        this.bands = this.bands.map( band =>{
            if( band.id === id ){
                band.votes += 1;
            }
            return band
        } )
    }

    changeBandName( id, newName ){
        if( this.searchBand( newName ) ){
            return
        }
        this.bands = this.bands.map( band => {
            if( band.id === id ){
                band.name = newName
            }

            return band
        } )
    }

}

module.exports = BandList