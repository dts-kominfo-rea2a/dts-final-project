import { ErrorMessage, Field as FormikField } from "formik";
import React from "react";

const Field = ({ type = 'text', label, id, className, size = 'medium', ...props }) => {
    return (
        <div className={className}>
            {
                label && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
            }
            <FormikField id={id} {...props}>
                {({
                    field,
                    meta: { touched, error }
                }) => (
                    <>
                    <input  type={type} className={`bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full ${{ small: 'p-1.5', medium: 'p-2.3', large: 'p-3.5' }[size]} `} {...field} />
                    <span></span>
                    </>
                )}
            </FormikField>
            <ErrorMessage component='span' className='text-red-600 text-sm' name={props.name} />
        </div>
    )
}

export default Field