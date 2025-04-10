const express = require("express"); // Importa Express para manejar rutas
const router = express.Router(); // Crea un router de Express
const {createTask,getTasks,getEspTask,updateTask,deleteTask } = require('../controllers/taskController');
const {validateCreateTask,validateUpdate}= require("../validators/taskValidators")

    // Crear un nuevo user
router.post("/",validateCreateTask, createTask);

router.get("/:id", getEspTask);
router.put("/:id", validateUpdate,updateTask);
router.delete("/:id", deleteTask);
router.get("/", getTasks);


module.exports = router; // Exporta el router para ser usado en index.js