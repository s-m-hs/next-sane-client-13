
import Swal from "sweetalert2";
const alertKey = (icon,title) =>
    Swal.fire({
        title: title,
        icon: icon,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
        showCancelButton: true,
        showCloseButton: true
      })

  export default alertKey



//   Swal.fire({
//     title: "هل تريد الاستمرار؟",
//     icon: "question",
//     iconHtml: "؟",
//     confirmButtonText: "نعم",
//     cancelButtonText: "لا",
//     showCancelButton: true,
//     showCloseButton: true
//   });