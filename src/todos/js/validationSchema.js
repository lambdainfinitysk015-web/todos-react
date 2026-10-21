
import * as yup from "yup";


const validationSchema = yup.object({
  todo: yup
    .string()
    .required("Please enter the text")
});

export default validationSchema