const { User } = require('../models');
const {  validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { use } = require('../routes/authRoutes');
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
    // Crear un nuevo User
exports.createUser =
 async (req, res) => {

        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    const mensajeUnico = errors.array().map(error => error.msg).join(", ");
                    return res.status(400).json({ message: mensajeUnico });
                }
                 const hashedPassword = await bcrypt.hash(req.body.password, 10);
                 req.body.password=hashedPassword
                
                const user = await User.create(req.body);
                res.status(201).json({"name":user.name,"email":user.email,"password":user.password});

        }catch (error){
                res.status(500).json({ message: error.message });
        }
};
   
exports.loginUser= 
async (req, res) => {
    try {
   
        const { email, password } = req.body;

            const user = await User.findOne({ where: { email:email } });
            if (!user) return res.status(400).json({ message: "Usuario no encontrado" });
            const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });
            
                const token = jwt.sign(
                    { id: user.id, email: user.email }, // Información dentro del token
                    SECRET_KEY, // Clave secreta para firmar el token
                    { expiresIn: process.env.TOKEN_EXPIRATION || "1h" } // Tiempo de expiración del token
                );
                // Enviamos el token al cliente
                res.cookie("token", token, { httpOnly: true, secure: true ,sameSite: 'None'});
                const msg= {"message": "Login exitoso",
                            "token":token
                }
                res.json( msg );   

    }catch (error){
            res.status(500).json({ error: error.message });
    }
};

exports.authUser= 
async (req, res) => {
    
    try {
        // Verificamos y decodificamos el token
        const decoded = req.user

        // Buscamos el usuario en la base de datos por su ID
        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        // Enviamos los datos del usuario autenticado
        res.json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
        // En caso de error, informamos que el token es inválido o ha expirado
        res.status(401).json({ message: "Token inválido o expirado" });
    }
};


exports.logoutAuth= 
async (req, res) => {
   res.clearCookie("token",{ httpOnly: true,
    secure: true, // o false si estás en local
    sameSite: 'none', // si estás usando cross-domain
    path: '/',});
   console.log("cerrada sesion ")
  res.json({ message: "Sesión cerrada" });
};
