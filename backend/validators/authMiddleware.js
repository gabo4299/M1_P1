const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
exports.authMiddleware=(req, res, next)=> {

    // const token = req.headers.authorization?.split(" ")[1];
    // // Si no hay token, se deniega el acceso
    // if (!token) return res.status(401).json({ message: "Acceso denegado, token requerido" });
    const token = req.cookies.token;
    console.log(token, "res es ",req.cookies)
    if (!token) return res.status(401).json({ message: "No autorizado" });
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: "Token inválido" });
      req.user = user;
      next();
    });
  };