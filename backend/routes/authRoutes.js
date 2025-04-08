const express = require("express"); // Importa Express para manejar rutas
const router = express.Router(); // Crea un router de Express
const {createUser,loginUser,authUser } = require('../controllers/authController');
const {validateCreateUser}= require("../validators/authValidators")

    // Crear un nuevo user
router.post("/register",validateCreateUser, createUser);

router.post("/login", loginUser);

router.get("/me", authUser);

module.exports = router; // Exporta el router para ser usado en index.js