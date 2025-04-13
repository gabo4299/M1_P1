import { X, EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { ModalTask } from './modalTask';
export function TaskCard({ task, getStatusColor, updateTaskStatus, deleteTask,updateTaskTitle }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState(task.title)
    const [taskDescription, setTaskDescription] = useState(task?.description)
    const [errorEditTask, setErrorEditTask] = useState(false)
    const [taskDate, setTaskDate] = useState(() => {
      const today = new Date(task.dueDate);
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    });
    
    const handleSubmit = async () => {
      let result
      if (taskTitle.trim() === ""){
         result=false
         setErrorEditTask(true)
      }else{
        setErrorEditTask(false)
         result= await updateTaskTitle(task.id,taskTitle,taskDescription,taskDate);
      }
     
       if (result) {
        alert("Tarea Editada")
        setIsModalOpen(false);}
  
      
    };
  return (

    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 
    border border-gray-200 dark:border-gray-600">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">{task.title}</h3>
        
        <div className="flex gap-0">
        <button
          onClick={ () => setIsModalOpen(true)}
          className={`p-1    text-gray-500 hover:text-gray-800   transition-colors`}
        >
               <EllipsisVertical className="w-5 h-5" />
        </button>
        <button
          onClick={ () => {
            if (task.status === "completada") {
              deleteTask(task.id);
            }
          }}
          className={`p-1    
            ${task.status == "completada" ?
              'text-red-500 hover:text-red-700'  :
              'text-gray-500' }    transition-colors`}
        >
               <X className="w-5 h-5" />
        </button>

        </div>
       
      </div>
      <p className="mb-5 text-sm text-gray-500 dark:text-gray-300 whitespace-pre-line break-words ">
      {task?.description}

      </p>
      <div className="space-y-3">
        <div className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
          {task.status}
        </div>
        <div className={`inline-block px-2 py-1 rounded-full text-sm text-sm text-gray-500 dark:text-gray-300`}>
          Fecha: {task.dueDate.slice(0, 10)}
        </div>
        <select
        
          value={task.status}
          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
          className="w-full px-3 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
        >
          {task.status === "pendiente" ? (
            <>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En progreso</option>
          </>
          ):(<></>)}

          {task.status === "en progreso" ? (
            <>
          <option value="en progreso">En progreso</option>
          <option value="completada">Completada</option>
          </>
          ):(<></>)}
                    {task.status === "completada" ? (
            <>
          <option value="completada">Completada</option>
          </>
          ):(<></>)}


        </select>
      </div>
      <ModalTask
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      taskTitle={taskTitle}
      setTaskTitle={setTaskTitle}
      errorAddTask={errorEditTask}
      taskDescription={taskDescription}
      setTaskDescription={setTaskDescription}
      taskDate={taskDate}
      setTaskDate={setTaskDate}
      handleSubmit={handleSubmit}
      
      />
    </div>
  );
}