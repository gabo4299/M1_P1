// Importación de hooks de React y la librería axios para hacer peticiones HTTP
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Crear el contexto de autenticación (AuthContext)
const AuthContext = createContext();
const apiUrl = import.meta.env.VITE_AURL;
const URL_AUTH=apiUrl+"auth/me"
const URL_LOGIN=apiUrl+"auth/login"
const URL_LOGOUT=apiUrl+"auth/logout"
// Componente proveedor de autenticación que envuelve a sus hijos y proporciona el contexto
export const AuthProvider = ({ children }) => {
    // Estado local para almacenar la información del usuario autenticado
    const [user, setUser] = useState(null);
    const [darkMode,setDarkMode]=useState(false);
    
    const toggleDarkMode=()=>{
        setDarkMode(!darkMode)
        localStorage.setItem("darkTheme", JSON.stringify(!darkMode));
    }
    
        const checkTheme=()=>{

        const saved = localStorage.getItem("darkTheme");
        const dark=saved !== null ? JSON.parse(saved) : false
        setDarkMode( dark)
        
        if (darkMode){
            document.documentElement.classList.add('dark')
         }
         else{
            document.documentElement.classList.remove('dark')
         }
    }

    // Función para verificar si el usuario está autenticado
    const checkAuth = async () => {
        try {
            // Realiza una solicitud GET a la ruta /profile en el backend para obtener la información del usuario autenticado
            const res = await axios.get(URL_AUTH, { withCredentials: true });
            
            // Si la solicitud es exitosa, guarda la información del usuario en el estado
            const userData={"name":res.data.name,
                            "email":res.data.email
            }
            setUser(userData);
        } catch {
            // Si ocurre un error (por ejemplo, el usuario no está autenticado), establece el estado de usuario como null
            setUser(null);
        }
    };


    // useEffect se ejecuta una vez cuando el componente se monta
    // Llama a la función checkAuth para comprobar si el usuario está autenticado
    useEffect(() => {
        checkAuth();
         // Llamar a checkAuth solo una vez al montar el componente
    }, []);  // El array vacío [] asegura que se ejecute solo al montar el componente
    useEffect(()=>{
        checkTheme(); 
    },[darkMode]);
    // Función para iniciar sesión con el nombre de usuario y la contraseña
    const login = async (email, password) => {
        try {
            // Realiza una solicitud POST a la ruta /login en el backend con el nombre de usuario y la contraseña
            const response = await axios.post(URL_LOGIN, { email, password }, { withCredentials: true });
    
            // Muestra el resultado de la respuesta en la consola
            console.log('Respuesta del servidor:', response.data);
    
            // Después de que el inicio de sesión sea exitoso, verifica el estado de autenticación
            await checkAuth();
            return true
        } catch (error) {
            // Maneja el error en caso de que la solicitud falle
            console.error('Error al realizar el login:', error);
            return false
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        // Realiza una solicitud POST a la ruta /logout en el backend para cerrar la sesión
        await axios.post(URL_LOGOUT, {}, { withCredentials: true });
        
        // Borra la información del usuario en el estado local
        setUser(null);
        
    };

    // Devuelve el proveedor de contexto AuthContext, pasando el estado del usuario y las funciones login y logout
    return (
        <AuthContext.Provider value={{ user, login, logout,toggleDarkMode,darkMode }}>
            {children}  {/* Renderiza los componentes hijos que estén envueltos en este proveedor */}
        </AuthContext.Provider>
    );
};

// Exporta el hook useAuth para que otros componentes puedan acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
