import { object, string, ref } from "yup";

export const passwordSchema = object({
  password: string()
    .required("Please enter a password")
    .min(8, "Password must have at least 8 characters"),
  password_confirmation: string()
    .required("Password required")
    .oneOf([ref("password")], "Passwords do not match"),
});


export const resetPasswordSchema = object({
  current_password: string()
  .required("Please enter a password")
    .min(8, "Password must have at least 8 characters"),
   password: string()
    .required("Please enter a password")
    .min(8, "Password must have at least 8 characters"),
  password_confirmation: string()
    .required("Password required")
    .oneOf([ref("password")], "Passwords do not match"),
});