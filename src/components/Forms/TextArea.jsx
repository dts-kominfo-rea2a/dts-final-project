import React from "react";

const TextArea = ({ type = 'text', label, id, className, size = 'medium', ...props }) => {
    return (
        <div className={className}>
            {
                label && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
            }
            <textarea id={id} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500" placeholder="Your message..." {...props}></textarea>
        </div>
    )
}

export default TextArea