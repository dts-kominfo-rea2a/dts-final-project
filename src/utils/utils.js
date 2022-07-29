export const convertToSelectOptions = (data, valueField, labelField) => {
    return data.map(item => ({
        value: item[valueField],
        label: typeof labelField === 'function' ? labelField(item) : item[labelField]
    }))
}

export const transformResponse = (response) => {
    if (response.error) {
        const errors = [];

        Object.keys(response.error.data.errors).forEach(key => {
            errors[key] = response.error.data.errors[key][0] || ''
        });

        return {
            isOk: false,
            status_code: response.error.status,
            ...response.error.data,
            errors: errors
        }
    }

    if (response.data) {
        return {
            isOk: response.data.status === 'success',
            status_code: 200,
            ...response.data
        }
    }

    return response
}