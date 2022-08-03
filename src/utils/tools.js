import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const swalFunc = withReactContent(Swal)
export const swal = (params) => {
    return swalFunc(params)
}

export const toast = ({swalConfig, ...params}) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        ...params
    })

    return Toast.fire({
        icon: 'success',
        ...params
    })
}