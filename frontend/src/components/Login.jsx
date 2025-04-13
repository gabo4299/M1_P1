// Importa el hook personalizado useAuth para acceder al contexto de autenticación
import { useAuth } from "../context/AuthContext";  // ✅ Asegúrate de que la ruta es correcta
import Input from "./ui/Input"
import Container from "./ui/Container"
import Button from "./ui/Button"
// Importa el hook useState de React para gestionar el estado del componente
import { useState } from "react";

// Importa el hook useNavigate de React Router para navegar entre páginas
import { useNavigate } from "react-router-dom";



// Definición del componente Login
const Login = () => {
    // Desestructura la función login del contexto de autenticación (AuthContext)
    const { user,login } = useAuth(); // ✅ Usa useAuth sin problemas
    // tailwind
    
    
    // Estado local para almacenar el valor del campo de nombre de usuario
    const [username, setUsername] = useState("");
    const [errorLogin,setErrorLogin]=useState(false)
    // Estado local para almacenar el valor del campo de la contraseña
    const [password, setPassword] = useState("");
    // Hook de React Router para navegar a diferentes rutas dentro de la aplicación
    const navigate = useNavigate();
    if (user) {
        navigate("/profile");
    }
    // Función que se ejecuta cuando el formulario es enviado
    const handleLogin = async (e) => {
        e.preventDefault();  // Prevenir el comportamiento por defecto del formulario (recarga de la página)
        
        try {
            // Intenta iniciar sesión utilizando el hook login que fue extraído del contexto AuthContext
            const resulLogin =await login(username, password);
            if (resulLogin) navigate("/profile");
            // Si el login es exitoso, n   avega a la ruta "/profile"
            else{
                setErrorLogin(!resulLogin)
                alert("error al iniciar sesion")
            }
            
        } catch (error) {
            // Si ocurre un error, muestra un mensaje de error en la consola
            console.error("Error en el inicio de sesión", error);
        }
    };

    // Renderiza el componente Login
    return (

<>
    <Container >
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
       
            <img className="py-6 mx-auto h-50 w-auto  " src="https://www.ucb.edu.bo/wp-content/uploads/2024/07/UCB-Ereccion-Canonica_Escudo-01-copia-1024x768.png"
             alt="Your Company"/>
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text
            -gray-900 dark:text-white">Ingresa a tu cuenta</h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} class="space-y-6" action="#" method="POST">
            <div>
            <div class="flex items-center justify-between">
                <label for="email" 
                class={`block text-sm/6 font-medium 
                ${errorLogin ?'text-red-600'  :'text-gray-900 dark:text-white' }
                `}
                >Correo</label>
                </div>
                <div class="mt-2">
                    
                    <Input  type="email" name="email" id="email" 
                    autocomplete="email" required 
                    value={username}  // El valor del campo se establece con el estado 'username'
                    onChange={(e) => setUsername(e.target.value)}  // Cuando el valor cambia, actualiza el estado 'username'
                    />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                <label for="email" 
                class={`block text-sm/6 font-medium 
                ${errorLogin ?'text-red-600'  :'text-gray-900 dark:text-white' }
                `}>
                    Contraseña</label>
                </div>
                <div class="mt-2">
                    
                    <Input  type="password" name="password" id="password" 
                    autocomplete="current-password" 
                    value={password}  // El valor del campo se establece con el estado 'password'
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>
            </div>

            <div>
                <Button   type="submit">Entrar</Button>
            </div>
        </form>

    <p class="mt-10 text-center text-sm/6 text-gray-500">
      No eres miembro?
      <a href="/register" 
      class="font-semibold text-indigo-600 hover:text-indigo-500">  Registro</a>
    </p>
  </div>
</Container>
            </>
    );
};

// Exporta el componente Login para que pueda ser utilizado en otras partes de la aplicación
export default Login;
