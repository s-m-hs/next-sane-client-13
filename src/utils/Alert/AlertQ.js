import Swal from "sweetalert2";

const alertQ = (position,icon,title,titleB) =>
    Swal.fire({
      position:position ,
      icon:icon ,
      title:title ,
      showConfirmButton: true,
      confirmButtonText:titleB,

      //   timer:timer ,
    })

    export default alertQ