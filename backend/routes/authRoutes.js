const express = require("express"); // Importa Express para manejar rutas
const router = express.Router(); // Crea un router de Express
const {createUser,loginUser,authUser,logoutAuth } = require('../controllers/authController');
const {validateCreateUser}= require("../validators/authValidators")
const {authMiddleware}= require("../validators/authMiddleware")
    // Crear un nuevo user
router.post("/register",validateCreateUser, createUser);

router.post("/login", loginUser);

router.get("/me",authMiddleware, authUser);

router.post("/logout",logoutAuth);

module.exports = router; // Exporta el router para ser usado en index.js