import React from "react";

const DefaultButton = ({ children, ...props }) => {
    return (
        <button 
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-200 focus:outline-none bg-gray-700 rounded-lg border border-gray-200 hover:bg-gray-500 hover:text-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" {...props}>
            {children}
        </button>
    )
}

export default DefaultButton