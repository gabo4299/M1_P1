
function Container ({children,...props}){
    return(
    <div 
    // className="bg-white items-center text-center dark:bg-gray-900  
    // relative min-h-screen flex-col 
    // justify-center px-6 py-12 lg:px-8"
        className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
    {...props}
    >
        {children}
         </div>)
   

}

export default Container;