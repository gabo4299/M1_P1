import { X, EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { ModalTask } from './modalTask';

export function TaskRow({ task, getStatusColor, updateTaskStatus,updateTaskTitle, deleteTask }) {
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
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-gray-800 dark:text-white">{task.title}</span>
        <p className=" text-xs hidden sm:block  text-gray-500 dark:text-gray-300 lg:max-w-[300px]  md:max-w-[250px] max-w-[50px] truncate overflow-hidden text-ellipsis break-words"> 
      {task.description}
      
    </p>
    <p className="text-xs hidden sm:block text-gray-500 dark:text-gray-300 ">
    {task.dueDate.slice(0, 10)}
    </p>
        <span className={`px-2 py-1  hidden md:block rounded-full text-sm ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <select
          value={task.status}
          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
          className="px-3 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
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