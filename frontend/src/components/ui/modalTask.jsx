import { X } from 'lucide-react';
export function ModalTask({ isModalOpen,setIsModalOpen,taskTitle,
    setTaskTitle,errorAddTask,taskDescription,setTaskDescription,
    taskDate,setTaskDate,handleSubmit}) {


    return (
        <>
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
                <textarea
                  type="text"
                  placeholder="Ingrese descripcion de tarea"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="w-full resize-none  px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    
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
          )}
        </>
    )

}
