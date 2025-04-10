const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
const { User } = require('../models');


// Obtener todos los clientes
exports.getUsers = async (req, res) => {
  
        const users = await User.findAll({
            attributes: ["id","name"],
          });

        res.json(users);


};

 // Obtener un User por ID
exports.findUser= async (req,res) =>{
    const user=await User.findByPk(req.params.id,{
        attributes: ['id', 'name', 'email']
      }); // Busca un User por su ID
    user ? res.json(user) : res.status(404).json({ error: "User not fund" }); // Devuelve error si no existe

}

exports.updateUser = async (req,res) =>{

    try {
        const decoded = req.user
        const user = await User.findByPk(decoded.id); // Busca el User por ID
        if (!user) return res.status(404).json({ error: "User no encontrado" }); // Si no existe, envía error
        if (req.body.password !== undefined && req.body.password !== '') {

            if (req.body.password.length < 6) {
                return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
              }
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password=hashedPassword
             
        }
        else{
            req.body.password=user.password
        }
        if (req.body.name === undefined) req.body.name = user.name;

         req.body.email = user.email;
        



        
        await user.update(req.body); // Actualiza el User con los nuevos datos
        res.json(user); // Devuelve el User actualizado
    }catch(error){
        console.log("error ",error)
        res.status(500).json({ error: error.message });
    }

    }



exports.deleteUser = async (req,res) =>{
   
     try {
            // Verificamos y decodificamos el token
            const decoded = req.user;
        
    const user = await User.findByPk(decoded); // Busca el User por ID
    if (!user) return res.status(404).json({ error: "User not fund" }); // Si no existe, envía error
    await user.destroy(); // Elimina el User de la base de datos
    res.json({ mensaje: "User deleted" }); // Devuelve mensaje de éxito
     }catch(Error){
        res.status(401).json({ message: "Token inválido o expirado" });
     }
    }