const express = require("express"); // Importa Express para manejar rutas
const router = express.Router(); // Crea un router de Express
const {createTask,getTasks,getEspTask,updateTask,deleteTask } = require('../controllers/taskController');
const {validateCreateTask,validateUpdate}= require("../validators/taskValidators")
const {authMiddleware}= require("../validators/authMiddleware")
    // Crear un nuevo user
router.post("/",authMiddleware,validateCreateTask, createTask);

router.get("/:id",authMiddleware, getEspTask);
router.put("/:id", authMiddleware,validateUpdate,updateTask);
router.delete("/:id",authMiddleware, deleteTask);
router.get("/", authMiddleware,getTasks);


module.exports = router; // Exporta el router para ser usado en index.js