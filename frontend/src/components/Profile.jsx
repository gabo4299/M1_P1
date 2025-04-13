// Importa el hook personalizado useAuth para acceder al contexto de autenticación
import { useAuth } from "../context/AuthContext";

// Importa el hook useNavigate de React Router para navegar entre páginas
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Title } from './ui/Title';
import { AddTask } from './ui/AddTask';
import { TaskFilter } from './ui/TaskFilter';
import { TaskCard } from './ui/TaskCard';
import { TaskRow } from './ui/TaskRow'
import { useState, useEffect } from 'react';
// Definición del componente Profile
const Profile = () => {
    // Desestructura las propiedades 'user' y 'logout' del contexto de autenticación
    const { user,darkMode,toggleDarkMode } = useAuth();
    // Hook de React Router para navegar a diferentes rutas dentro de la aplicación
    const navigate = useNavigate();
    // Si no hay un usuario autenticado, muestra un mensaje de carga
    
    // ////////////////////////////////////////////////////////////////////////////////////////////////
    const [tasks, setTasks] = useState([]);
    const [filterTitle, setFilterTitle] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isGridView, setIsGridView] = useState(false);
    const apiUrl = import.meta.env.VITE_AURL;
    useState
    const URL_GET_TASKS=apiUrl+"task/"
    
    
    const fetchData = async () =>{
      try {
        let Query = {}

        
          if (filterTitle.trim() !== ""){
            Query["search"]=filterTitle;
          }
          if (filterStatus !== "all")
          {
            Query["status"]=filterStatus
          }
          console.log(filterStatus,Query)
      
      const res =  await axios.get(URL_GET_TASKS,
        {
         params: Query ,
         withCredentials: true }

      );
      console.log(res.data)
      setTasks(res.data)
    }
    catch (error) {
      console.error(error);
      console.error(error.message);
      const backendMessage = error.response.data?.message|| 'Ocurrió un error';
      alert(`Error del servidor: ${backendMessage}`);
    }
    
    }


    useEffect(() => {
      
      
      fetchData()
    }, [filterTitle,filterStatus])
    



      const deleteTask =async  (taskId) => {
        try {
           await axios.delete(URL_GET_TASKS+String(taskId), { withCredentials: true }
            );
            fetchData()
            return true
          }
          catch (error) {
       
            if (error.response) {
              // Aquí está el mensaje personalizado si tu backend lo envió como { message: "algo" }
              const backendMessage = error.response.data?.message|| 'Ocurrió un error';
              alert(`Error del servidor: ${backendMessage}`);
            } else {
              // Este es un error de red o algo que no llega al backend
              alert(`Error de red: ${error.message}`);
            }
            alert(`Error de red: `);
          }
      };

      const updateTaskStatus = async (taskId, newStatus) => {

    try {
      const status=newStatus
       await axios.put(URL_GET_TASKS+String(taskId), { status }, { withCredentials: true }
        );
        fetchData()
        return true
      }
      catch (error) {
        console.error("erroooooooor ",error);
   
        if (error.response) {
          // Aquí está el mensaje personalizado si tu backend lo envió como { message: "algo" }
          const backendMessage = error.response.data?.message|| 'Ocurrió un error';
          alert(`Error del servidor: ${backendMessage}`);
        } else {
          // Este es un error de red o algo que no llega al backend
          alert(`Error de red: ${error.message}`);
        }
        alert(`Error de red: `);
      }
      };

      const updateTaskTitleDesc =async (taskId,title,description,taskDate) =>{
        try {
        const dueDate=taskDate
        const res =  await axios.put(URL_GET_TASKS+String(taskId), { title, description,dueDate }, { withCredentials: true }
        );
        console.log(res.data)
        fetchData()
        return true
      }
      catch (error) {
        console.error(error);
        console.error(error.message);
        const backendMessage = error.response.data?.message|| 'Ocurrió un error';
        alert(`Error del servidor: ${backendMessage}`);
      }
      return false
      
      }
  
    const URL_REG=apiUrl+"task/"
      const addTask = async (title,description,dateTask) => {
        console.log("add task",title,description,dateTask)
        const status="pendiente"
        const dueDate=dateTask
        try {
          await axios.post(URL_REG, { title,description, status,dueDate }, { withCredentials: true });
          
          return true
      } catch (err) {
          alert(err.response?.data?.message)
      }
        return false
        }
      
    
    const getStatusColor = (status) => {
        switch (status) {
          case 'pendiente':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
          case 'en progreso':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
          case 'completada':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
          default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
      };


    // ////////////////////////////////////////////////////////////////////////////////////////////////
    if (!user) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white "> No auntentificado </h1>
        <button 
        className=" px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        onClick={() => { 
                navigate("/");  // Redirige al usuario a la página de inicio después de cerrar sesión
            }}>
                Ir a incio de sesion    
            </button>
    </div>)

    // Renderiza el componente Profile
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Title 
              darkMode={darkMode}
              setDarkMode={toggleDarkMode}
              isGridView={isGridView}
              setIsGridView={setIsGridView}
            />
  
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <AddTask 
                addTask={addTask}
              />
  
              <TaskFilter
                filterTitle={filterTitle}
                setFilterTitle={setFilterTitle}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
              />
  
              {isGridView ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      getStatusColor={getStatusColor}
                      updateTaskStatus={updateTaskStatus}
                      deleteTask={deleteTask}
                      updateTaskTitle={updateTaskTitleDesc}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {tasks.map(task => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      getStatusColor={getStatusColor}
                      updateTaskStatus={updateTaskStatus}
                      deleteTask={deleteTask}
                      updateTaskTitle={updateTaskTitleDesc}
                    />
                  ))}
                </div>
              )}
              {tasks.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400">No se encontraron Tareas</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

// Exporta el componente Profile para que pueda ser utilizado en otras partes de la aplicación
export default Profile;