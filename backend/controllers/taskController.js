const { Task,User } = require('../models');
const {  validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Op } = require("sequelize");


exports.createTask =
 async (req, res) => {
        
        try {
            const decoded = req.user;
            
                    // Buscamos el usuario en la base de datos por su ID
                const user = await User.findByPk(decoded.id);
                if (!user) return res.status(400).json({"msg":"usuario no encontrado"})
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        
                        const mensajeUnico = errors.array().map(error => error.msg).join(" ");;
                    return res.status(400).json({ message: mensajeUnico });
                }
                req.body.userId=user.id

                const task = await Task.create(req.body);
                const { updatedAt,createdAt, ...taskWithoutDates } = task.dataValues;
                
                const message= {
                    "message":"Tarea creada exitosamente",
                    "task":taskWithoutDates
                }
                res.status(201).json(message);

        }catch (error){
                res.status(500).json({ message: error.message });
        }
};



exports.getEspTask =
 async (req, res) => {
        try {
            const decoded = req.user;
            
                    // Buscamos el usuario en la base de datos por su ID
                const user = await User.findByPk(decoded.id);
                if (!user) return res.status(400).json({"msg":"usuario no encontrado"})

                const task = await Task.findByPk(req.params.id);
                
                task ? res.json(task) : res.status(404).json({ error: "Tarea no encontrado" });

        }catch (error){
                res.status(500).json({ message: error.message });
        }
};

exports.getTasks =
 async (req, res) => {
           try {
            const decoded = req.user;
            
                    // Buscamos el usuario en la base de datos por su ID
                const user = await User.findByPk(decoded.id);
                if (!user) return res.status(400).json({"msg":"usuario no encontrado"})
                const { status, search } = req.query;
                const filter = {};
                console.log("los query ",req.query)
                // Si viene status como query param, lo usamos para filtrar
                if (status) {
                  filter.status = req.query.status;
                }
                if (search) {
                        filter[Op.and] = [
                                {
                                  [Op.or]: [
                                    { title: { [Op.like]: `%${search}%` } },
                                    { description: { [Op.like]: `%${search}%` } }
                                  ]
                                }
                              ];
                }
                filter.userId=user.id

                const tasks = await Task.findAll({
                    where: filter,
                    attributes: { exclude: ['createdAt','updatedAt'] }
                    });
                tasks ? res.json(tasks) : res.status(404).json({ message: "Tarea no encontrado" });

        }catch (error){
                console.log("errooorr ",error.message)
                res.status(500).json({ message: error.message });
        }
};

exports.getEspTask =
 async (req, res) => {
        try {
            const decoded = req.user;
            
                    // Buscamos el usuario en la base de datos por su ID
                const user = await User.findByPk(decoded.id);
                if (!user) return res.status(400).json({"msg":"usuario no encontrado"})

                const task = await Task.findByPk(req.params.id);
                task ? res.json(task) : res.status(404).json({ message: "Task no encontrado" });

        }catch (error){
                res.status(500).json({ message: error.message });
        }
};

exports.updateTask =
 async (req, res) => {
        try {
            const decoded = req.user;
            
                    // Buscamos el usuario en la base de datos por su ID
                const user = await User.findByPk(decoded.id);
                const task = await Task.findByPk(req.params.id);
                if (!user) return res.status(400).json({"message":"usuario no encontrado"})
                if (!task) return res.status(400).json({"message":"tarea no encontrado"})
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        const mensajeUnico = errors.array().map(error => error.msg).join(" ");;
                        return res.status(400).json({ message: mensajeUnico });
                }
                if (user.id !== task.userId) return res.status(400).json({"message":"usuario no autorizado"})
                //  cambio de titulo
                const updateData={ }
                if (req.body.title !== undefined && req.body.title !== "" ){
                        updateData.title=req.body.title
                }
                if (req.body.dueDate!== undefined) updateData.dueDate=req.body.dueDate
                if (req.body.status !== undefined){
                        
                        if (task.status === "completada") return res.status(500).json({ message: "Solo se puede eliminar no cambiar estado" });
                        if (task.status === "pendiente" &&  req.body.status !== "en progreso")  return res.status(500).json({ message: "Solo se puede pasar de pendiente a progreso" });
                        else if (task.status === "pendiente") updateData.status=req.body.status
                        if (task.status === "en progreso" &&  req.body.status !== "completada")  return res.status(500).json({ message: "Solo se puede pasar de en progreso  a completada" });
                        else if (task.status === "en progreso") updateData.status=req.body.status
                        

                }       
                if (req.body.description !== undefined) updateData.description=req.body.description
                if (req.body.dueData !== undefined && req.body.dueData) updateData.description=req.body.description
 
                await task.update(updateData); // Actualiza el User con los nuevos datos
                res.json(task); // Devuelve el User actualizado

        }catch (error){
                res.status(500).json({ message: error.message });
        }
};


exports.deleteTask =
 async (req, res) => {

        try {
                const decoded = req.user;
                const user = await User.findByPk(decoded.id);
                const task = await Task.findByPk(req.params.id);
                if (!user) return res.status(400).json({"message":"usuario no encontrado"})
                if (!task) return res.status(400).json({"message":"tarea no encontrado"})
                if (user.id !== task.userId) return res.status(400).json({"message":"usuario no autorizado"})
                if (task.status !== "completada") return res.status(500).json({ message: "Solo se puede eliminar cuando este completada" });
                await task.destroy();
                res.json({ mensaje: "Task deleted" }); 

        }
        catch (error){
                res.status(500).json({ message: error.message });
      

        }

 }