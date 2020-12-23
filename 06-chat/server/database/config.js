
const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        console.log('db online');

    }catch(err){
        console.log(err);
        throw new Error('Error en la base de datos, vea logs')
    }
}

module.exports = {
    dbConnection
}