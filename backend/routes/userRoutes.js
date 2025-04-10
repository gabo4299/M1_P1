const express = require("express"); // Importa Express para manejar rutas
const router = express.Router(); // Crea un router de Express
const {deleteUser,findUser,getUsers,updateUser } = require('../controllers/userController');
// Obtener todos los clientes sin password
// router.get("/", getUsers);

    // Obtener un cliente por ID sin passwrd
router.get("/:id", findUser);

// Actualizar un cliente  solo password o name
router.put("/",updateUser );

    // Eliminar un cliente
router.delete("/",deleteUser);

module.exports = router; // Exporta el router para ser usado en index.js