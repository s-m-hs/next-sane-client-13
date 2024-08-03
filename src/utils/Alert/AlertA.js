import Swal from "sweetalert2";

const alertN = (position,icon,title,timer) =>
    Swal.fire({
      position:position ,
      icon:icon ,
      title:title ,
      showConfirmButton: false,
      timer:timer ,
    })

    export default alertN