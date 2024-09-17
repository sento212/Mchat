import Swal from "sweetalert2";

const Alert = (title, text, output) => {
  Swal.fire({
    title: title,
    text: text,
    icon: output,
    confirmButtonText: "Cool",
  });
};

export default Alert;
