import Swal from "sweetalert2";
 const alertP=(title1,icon1,title2,title3,icon2)=>Swal.fire({
    title: title1,
    // text: "You won't be able to revert this!",
    icon: icon1,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: title2
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: title3,
        // text: "Your file has been deleted.",
        icon: icon2
      });
    }
  });


  export default alertP