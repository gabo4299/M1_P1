const express = require("express");
// rutas
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const { Sequelize } = require("sequelize");
const dbConfig = require("./config/config.js").development;
const sequelize = new Sequelize(dbConfig);
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.use(express.json());

const corsOptions = {
    origin: process.env.FRONTEND_URL || "*", // ejemplo: http://localhost:5173
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    };
app.use(cors(corsOptions));

// app.use(cors({ origin: "http://localhost:5000", credentials: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);




const PORT = process.env.PORT || 3000;
sequelize.authenticate()
.then(() => console.log(" Conectado a PostgreSQL"))
.catch(err => console.error(" Error al conectar:", err));
 
app.get("/", (req, res) => {
res.send(" ¡Bienvenido a la API! Usa /clientes o /pedidos para interactuar.");
});



// Iniciar el servidor en el puerto definido
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
