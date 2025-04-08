const { User } = require('../models');
const { use } = require('../routes/authRoutes');

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
    const user = await User.findByPk(req.params.id); // Busca el User por ID
    if (!user) return res.status(404).json({ error: "User not fund" }); // Si no existe, envía error
    await user.update(req.body); // Actualiza el User con los nuevos datos
    res.json(user); // Devuelve el User actualizado
    }catch(error){
        res.status(500).json({ error: error.message });
    }

    }



exports.deleteUser = async (req,res) =>{
    const user = await User.findByPk(req.params.id); // Busca el User por ID
    if (!user) return res.status(404).json({ error: "User not fund" }); // Si no existe, envía error
    await user.destroy(); // Elimina el User de la base de datos
    res.json({ mensaje: "User deleted" }); // Devuelve mensaje de éxito
    }