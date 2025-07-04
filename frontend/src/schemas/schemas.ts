import * as yup from 'yup';

//validate the user input on signup
export const signupSchema = yup.object().shape({
    fullname:yup.string().max(60).required("Full name is required"),
    username:yup.string().max(60).required("Username is required"),
    email:yup.string().max(225).email("Please enter a valid email").required("Email is required"),
    password:yup.string().required("Password is required"),
    country_code:yup.string().required("Country code is required"),
    phone:yup.number().required("Phone number is required")
});

//validate the user input on login
export const loginSchema = yup.object().shape({
    email:yup.string().max(225).email("Please enter a valid email").required("Email is required"),
    password:yup.string().required("Password is required"),
    country_code:yup.string().required("Country code is required"),
    phone:yup.number().required("Phone number is required")
});