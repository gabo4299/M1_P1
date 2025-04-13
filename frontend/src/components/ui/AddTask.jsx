import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import {ModalTask} from "./modalTask"

export function AddTask({ addTask }) {
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [errorAddTask, setErrorAddTask] = useState(false)
  const [taskDate, setTaskDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const handleSubmit = async () => {
    let result
    if (taskTitle.trim() === ""){
       result=false
       setErrorAddTask(true)
    }else{
      setErrorAddTask(false)
       result= await addTask(taskTitle,taskDescription,taskDate);
    }
   
     if (result) {
      setTaskDate(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;})
      setTaskDescription('')
      setTaskTitle('')
      alert("Tarea Creada")
      setIsModalOpen(false);}

    
  };



  return (
    <>
      <div className="flex mb-6 ">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Añadir Tarea
        </button>
      </div>
      <ModalTask
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      taskTitle={taskTitle}
      setTaskTitle={setTaskTitle}
      errorAddTask={errorAddTask}
      taskDescription={taskDescription}
      setTaskDescription={setTaskDescription}
      taskDate={taskDate}
      setTaskDate={setTaskDate}
      handleSubmit={handleSubmit}
      
      />
{/* 
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Añadir Nueva Tarea </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Ingrese titulo de tarea"
              value={taskTitle}
              required
              onChange={(e) => setTaskTitle(e.target.value)}
              className={`w-full px-4 py-2 mb-4 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${errorAddTask ?'border-red-600'  :'dark:border-gray-600' }
              dark:bg-gray-700  dark:text-white
              `}

              autoFocus
            />
            <input
              type="text"
              placeholder="Ingrese descripcion de tarea"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"

            />
            <input
              type="Date"
              placeholder="Date"
              value={taskDate}
              min={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"

            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}