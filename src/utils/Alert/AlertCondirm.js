import Swal from "sweetalert2";
const AlertCondirm = (title1, icon1, title2, fun) => Swal.fire({
  title: title1,
  // text: "You won't be able to revert this!",
  icon: icon1,
  showCancelButton: false,
  confirmButtonColor: "var(--themA)",
  confirmButtonText: title2
}).then((result) => {
  if (result.isConfirmed) {
    fun()
  }
});


export default AlertCondirm