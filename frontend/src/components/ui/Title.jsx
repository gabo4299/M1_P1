import { Moon, Sun, LayoutGrid, List, LogOut } from 'lucide-react';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
export function Title({ darkMode, setDarkMode, isGridView, setIsGridView }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const logouter=()=>{
        logout()
        navigate('/')
    }
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        {/* taskManager */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:order-1">
        Administrador de Tareas</h1>
      {/* Welcome */}
      <h2 className="text-xl text-gray-600 
      dark:text-gray-300 order-2 sm:order-1">
        Bienvenido {user.name}</h2>
      {/* Botones */}
      <div className="flex gap-2 order-3 sm:order-2">
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {isGridView ? 
            <List className="w-5 h-5 text-gray-700 dark:text-gray-200" /> : 
            <LayoutGrid className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          }
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
        </button>
        <button
          className="p-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
          onClick={logouter}
        >
          <LogOut className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}