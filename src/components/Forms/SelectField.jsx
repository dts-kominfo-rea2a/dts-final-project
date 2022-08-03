import { Field } from "formik";
import React from "react";

const SelectField = ({
    id,
    label,
    options,
    ...props
}) => {
    return (
        <>
            <div>
                {
                    label && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{label}</label>
                }
                <Field 
                    as="select"
                    id={id} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                    {...props}>
                    {
                        options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
                    }
                </Field>
            </div>
        </>
    )
}

export default SelectField;