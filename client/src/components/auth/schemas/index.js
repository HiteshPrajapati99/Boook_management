import * as Yup from "yup";

// Register schema
export const formSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("place Enter Your Name"),
  number: Yup.string()
    .min(10, "Number Must be 10 digit")
    .max(12, "Allow only 10 digit Number")
    .required("Pleace Enter Your Mobile  Number"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Pleace Enter Your Email"),
  password: Yup.string()
    .min(8, "Pleace Use Stong Password")
    .max(16)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("place Enter Your Password"),
  c_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password Does Not Match")
    .required("Place  Conform Your Password"),
});

// Login schema

export const loginschema = Yup.object({
  email: Yup.string().email().required("Pleace Enter Your Email"),
  password: Yup.string()
    .min(8, "Pleace Enter 8 digit Password")
    .max(16)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Pleace Enter Your Password"),
});
