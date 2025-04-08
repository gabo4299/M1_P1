const express = require("express"); // Importa Express para manejar rutas
const router = express.Router(); // Crea un router de Express
const {deleteUser,findUser,getUsers,updateUser } = require('../controllers/userController');
// Obtener todos los clientes
router.get("/", getUsers);

    // Obtener un cliente por ID
router.get("/:id", findUser);

// Actualizar un cliente
router.put("/:id",updateUser );

    // Eliminar un cliente
router.delete("/:id",deleteUser);

module.exports = router; // Exporta el router para ser usado en index.js