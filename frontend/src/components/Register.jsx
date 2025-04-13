import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "./ui/Input"
import Container from "./ui/Container"
import Button from "./ui/Button"

const Register = () => {
    const apiUrl = import.meta.env.VITE_AURL;
    const URL_REG=apiUrl+"auth/register"
    const [email, setEmail] = useState("");
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        

        try {
            await axios.post(URL_REG, { name,email, password }, { withCredentials: true });
            alert("Usuario registrado con éxito");
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Error al registrar usuario");
            console.log(error)
            alert(err.response?.data?.message)
        }
    };

    return (
<Container >

        <div class="mt-0    sm:mx-auto sm:w-full sm:max-w-sm">
       
            <img className="mx-auto h-35 w-auto  " src="https://www.ucb.edu.bo/wp-content/uploads/2024/07/UCB-Ereccion-Canonica_Escudo-01-copia-1024x768.png"
             alt="Your Company"/>
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight 
            text-gray-900 dark:text-white">
                Register</h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleRegister} class="space-y-6" action="#" method="POST">
        <div>
            <div class="flex items-center justify-between">
                <label for="name" 
                class="block text-sm/6 font-medium text-gray-900 dark:text-white">Name</label>
                </div>
                <div class="mt-2">
                    <Input  name="email" id="email" 
                    required 
                    value={name}  // El valor del campo se establece con el estado 'username'
                    onChange={(e) => setName(e.target.value)}  // Cuando el valor cambia, actualiza el estado 'username'
                    />
                </div>
            </div>
            <div>
            <div class="flex items-center justify-between">
                <label for="email" 
                class="block text-sm/6 font-medium text-gray-900 dark:text-white">Email address</label>
                </div>
                <div class="mt-2">
                    <Input type="email" name="email" id="email" 
                    autocomplete="email" required 
                    value={email}  // El valor del campo se establece con el estado 'username'
                    onChange={(e) => setEmail(e.target.value)}  // Cuando el valor cambia, actualiza el estado 'username'
                    />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm/6 font-medium text-gray-900 dark:text-white">Password</label>
                </div>
                <div class="mt-2">
                    <Input type="password" name="password" id="password" 
                    autocomplete="current-password" 
                    value={password}  // El valor del campo se establece con el estado 'password'
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>
            </div>


            <div>
                <Button   type="submit">Register</Button>
            </div>
        </form>

    
  </div>
</Container>
    );
};

export default Register;
