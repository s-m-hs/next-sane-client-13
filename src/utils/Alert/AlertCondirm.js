import Swal from "sweetalert2";
 const AlertCondirm=(title1,icon1,title2,title3,icon2,fun)=>Swal.fire({
    title: title1,
    // text: "You won't be able to revert this!",
    icon: icon1,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: title2
  }).then((result) => {
    if (result.isConfirmed) {
        fun()
    }
  });


  export default AlertCondirm