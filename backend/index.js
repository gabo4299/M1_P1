const express = require("express");
// rutas
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();
const { Sequelize } = require("sequelize");
const dbConfig = require("./config/config.js").development;
const sequelize = new Sequelize(dbConfig);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Cargamos las variables de entorno desde el archivo .env
require("dotenv").config();



const PORT = process.env.PORT || 3000;
sequelize.authenticate()
.then(() => console.log(" Conectado a PostgreSQL"))
.catch(err => console.error(" Error al conectar:", err));
 
app.get("/", (req, res) => {
res.send(" ¡Bienvenido a la API! Usa /clientes o /pedidos para interactuar.");
});

// Simulamos una base de datos en memoria con un arreglo de usuarios
const users = [];




// Obtener datos del usuario autenticado
app.get("/auth/me", (req, res) => {
    // Extraemos el token del header de autorización
    const token = req.headers.authorization?.split(" ")[1];

    // Si no hay token, se deniega el acceso
    if (!token) return res.status(401).json({ message: "Acceso denegado, token requerido" });

    try {
        // Verificamos y decodificamos el token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Buscamos el usuario en la base de datos por su ID
        const user = users.find(user => user.id === decoded.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        // Enviamos los datos del usuario autenticado
        res.json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
        // En caso de error, informamos que el token es inválido o ha expirado
        res.status(401).json({ message: "Token inválido o expirado" });
    }
});

// Iniciar el servidor en el puerto definido
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
