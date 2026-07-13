import Swal from 'sweetalert2'


const AlertInfo = (title) => {
    Swal.fire({
        position: "center",
        icon: "info",
        title: title,
        showConfirmButton: false,
        timer: 1500,
    })
}
export default AlertInfo