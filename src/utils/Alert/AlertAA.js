import Swal from 'sweetalert2'


const alertAA = (title) => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: title,
        showConfirmButton: false,
        timer: 1500,
    })
}
export default alertAA