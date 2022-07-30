import { ErrorMessage, Field as FormikField } from "formik";
import React from "react";

const TextAreaField = ({ type = 'text', label, id, className, size = 'medium', ...props }) => {
    return (
        <div className={className}>
            {
                label && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
            }
            <FormikField
                as="textarea"
                id={id}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                {...props}>
            </FormikField>
            <ErrorMessage component='span' className='text-red-600 text-sm' name={props.name} />
            {/* <textarea id={id}  placeholder="Your message..." {...props}></textarea> */}
        </div>
    )
}

export default TextAreaField