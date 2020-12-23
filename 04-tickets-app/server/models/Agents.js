const Agent = require('./Agent');

class Agents{
    constructor(){
        this.agents = [];
    }

    isExist( name, desktop ){
        return this.agents.reduce( (exist, agent) => exist && ( agent.name === name || agent.desktop === desktop ), true );
    }

    add( name, desktop ){
        if( !this.isExist(name, desktop) ){
            this.agents.push( new Agent(name, desktop) )
        }
    }

    remove( name, desktop ){
        this.agents = this.agents.filter( agent => {
            return !(agent.name === name || agent.desktop === desktop)
        } )
    }
}