
const bcrypt = require('bcryptjs')

const User = require('../models/user')

const { generateJWT } = require('../helpers/jwt')

const create = async (req, res) => {
    
    try{
        const { email, password, name } = req.body;

        const isExistEmail = await User.findOne({ email });

        if( isExistEmail ){
            res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            })
            return
        }


        const user = new User( req.body );

        // encriptar contraseña
        
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt  )

        //Guardar usuario en DB

        await user.save()

        const token = await generateJWT( user.id )

        res.status(200).json({
            ok: true,
            user,
            token
        })
    }catch(err){
        console.log( err );
        res.status(500).json({
            ok: false,
            msg: 'error en la db'
        })
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;

    try{

        const userDB = await User.findOne({ email })
        if( !userDB ){
            res.status(404).json({
                ok: false, 
                msg: 'Email no encontradow'
            })
            return
        }

        const isValid = bcrypt.compareSync( password, userDB.password )

        if( !isValid ){
            res.status(404).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            })
            return
        }

        const token = await generateJWT( userDB.id )

        /* userDB.online = true;
        userDB.save() */
        
        res.status(200).json({
            ok: true,
            user: userDB,
            token
        })


    }catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            msg: 'error en la base de datos'
        })
    }
}

const revalidateToken = async (req, res) => {

}

module.exports = {
    create,
    login,
    revalidateToken,
}