import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../input/Input";
import { USER, userRegister } from "../../auth";

const Register = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    rePassword: "",
    mobileNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    userNameErrorMessage: "",
    emailErrorMessage: "",
    passwordErrorMessage: "",
    mobileNumberErrorMessage: "",
    rePasswordErrorMessage: "",
    userCreatedMessage: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    let array = Object.keys(errorMessage);
    setErrorMessage({
      ...errorMessage,
      [array.find((nameAttribute) => nameAttribute.includes(name))]: " ",
    });

    // if(name.localeCompare("userName")){
    //     setErrorMessage(({...errorMessage,userNameErrorMessage:""}))
    // }
    // if(name.localeCompare("email")){
    //     setErrorMessage({...errorMessage,emailErrorMessage:""})
    // }
    // if(name.localeCompare("password")){
    //     setErrorMessage({...errorMessage,passwordErrorMessage:""})
    // }
    // if(name.localeCompare("rePassword")){
    //     setErrorMessage({...errorMessage,rePasswordErrorMessage:""})
    // }
    // if(name.localeCompare("mobileNumber")){

    //     setErrorMessage({...errorMessage,mobileNumberErrorMessage:""})
    // }

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //     const handleSubmit=async()=>{
  //         const payload={
  //             id:""
  //         }
  //   try{
  //     const response = await userRegister(payload)

  //   } catch(error){
  //     console.error(error)
  //   }
  //     }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrorMessage = {
      userNameErrorMessage: "",
      emailErrorMessage: "",
      passwordErrorMessage: "",
      mobileNumberErrorMessage: "",
      rePasswordErrorMessage: "",
    };
    let isValid = true;
    if (!formData.userName) {
      newErrorMessage.userNameErrorMessage = "User name should not Be Empty";
      isValid = false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrorMessage.emailErrorMessage = "Email should not Be Empty";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrorMessage.emailErrorMessage = "Email should be in proper format";
      isValid = false;
    }
    const passwordRegax =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!formData.password) {
      newErrorMessage.passwordErrorMessage = "Password should not be empty";
      isValid = false;
    } else if (!passwordRegax.test(formData.password)) {
      newErrorMessage.passwordErrorMessage =
        "Password must contain Minimum eight characters, one uppercase letter, one lowercase letter, one number and one special character ";
      isValid = false;
    }
    if (!formData.rePassword) {
      newErrorMessage.rePasswordErrorMessage = "Please Re-enter your Password";
      isValid = false;
    } else if (formData.rePassword != formData.password) {
      newErrorMessage.rePasswordErrorMessage = "Password not matched ";
      isValid = false;
    }
    if (!formData.mobileNumber) {
      newErrorMessage.mobileNumberErrorMessage =
        "Mobile number should not be empty";
      isValid = false;
    } else if (formData.mobileNumber.length != 10) {
      newErrorMessage.mobileNumberErrorMessage =
        "Mobile Number Should Consist 10 numbers";
    }
    setErrorMessage(newErrorMessage);
    if (isValid) {
      let registerUser = async () => {
        try {
          console.log(formData);
          const response = await userRegister(formData);
          console.log(response.data);
          localStorage.setItem("userName", formData.userName);
          setErrorMessage({
            userCreatedMessage: "User Registered sucessfully",
          });
          setTimeout(() => {
            navigate("/home");
          }, 1500);
        } catch (error) {
          console.error("There was an error registering:", error);
          console.log(error.response.status);
          console.log(error.response.data.message);
          if (error.response.data.message.match("User name not available")) {
            setErrorMessage({
              userNameErrorMessage: "UserName  Already Exists",
            });
          }
          if (
            error.response.data.message.match("Email name is not available")
          ) {
            setErrorMessage({ emailErrorMessage: "Email is already exists" });
          }
        }
      };
      registerUser();
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <h1 className="text-xxl text-fuchsia-700"> User Registration Page</h1>
        <Input
          label="Enter Username : "
          type="text"
          name="userName"
          placeholder="Enter Username"
          onChange={handleChange}
          value={formData.userName}
          errorMessage={errorMessage.userNameErrorMessage}
        />
        <Input
          label="Enter email"
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={formData.email}
          errorMessage={errorMessage.emailErrorMessage}
        />
        <Input
          label="Enter password"
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          value={formData.password}
          errorMessage={errorMessage.passwordErrorMessage}
        />
        <Input
          label="Re-enter password"
          type="password"
          name="rePassword"
          placeholder="Re-enter your password"
          onChange={handleChange}
          value={formData.rePassword}
          errorMessage={errorMessage.rePasswordErrorMessage}
        />
        <Input
          label="Enter Mobile Number : "
          type="tel"
          name="mobileNumber"
          placeholder="enter mobile-number"
          onChange={handleChange}
          value={formData.mobileNumber}
          errorMessage={errorMessage.mobileNumberErrorMessage}
        />
        <button type="submit">Register</button>
        {errorMessage.userCreatedMessage && (
          <h1 className="text-lg text-green-600">
            {errorMessage.userCreatedMessage}
          </h1>
        )}
        <p>
          Already have an account ?{" "}
          <span
            className="cursor-pointer text-blue-600 hover:text-blue-300"
            onClick={() => navigate("/")}
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};
export default Register;
