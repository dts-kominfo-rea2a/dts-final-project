import React from "react";

const Input = ({ type = 'text', label, id, className, size = 'medium', ...props }) => {
    return (
        <div className={className}>
            {
                label && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
            }
            <input type={type} id={id} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full ${{ small: 'p-1.5', medium: 'p-2.3', large: 'p-3.5' }[size]} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} {...props} />
        </div>
    )
}

export default Input