const express = require("express");
// rutas
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const { Sequelize } = require("sequelize");
const dbConfig = require("./config/config.js").development;
const sequelize = new Sequelize(dbConfig);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
// Cargamos las variables de entorno desde el archivo .env
require("dotenv").config();



const PORT = process.env.PORT || 3000;
sequelize.authenticate()
.then(() => console.log(" Conectado a PostgreSQL"))
.catch(err => console.error(" Error al conectar:", err));
 
app.get("/", (req, res) => {
res.send(" ¡Bienvenido a la API! Usa /clientes o /pedidos para interactuar.");
});



// Iniciar el servidor en el puerto definido
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
