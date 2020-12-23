

class List{
    constructor( length ){
        this.list = [];
        this.length = length;
    }

    add( element ){
        this.list.unshift( element )
        if( this.list.length > this.length ){
            this.list.length = this.length;
        }
    }

    getList(){
        return this.list;
    }
}

module.exports = List