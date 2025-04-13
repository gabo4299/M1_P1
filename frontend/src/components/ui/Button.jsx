
function Button ({children,...props}){
    return(
    <button 
    class="flex w-full justify-center
     rounded-md bg-gray-900 dark:bg-white px-3 py-1.5 text-sm/6 
     font-semibold text-white dark:text-gray-900  shadow-xs 
     hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 
     focus-visible:outline-indigo-600"

    {...props}
    >
        {children}
         </button>)
   

}

export default Button;