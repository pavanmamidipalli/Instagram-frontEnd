import Input from '../input/Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER, userLogIn } from '../../auth';

const Login = () => {
    const [credentials, setCredentials] = useState({
        userName: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState({
        userNameMessage: '',
        passwordMessage: '',
        userFoundMessage:'',
    });
    let navigate = useNavigate();
    let handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials(({
            ...credentials,
            [name]: value,
        }))
    }
    let handleFormSubmit = (event) => {
        event.preventDefault();
        let message = {
            userNameMessage: '',
            passwordMessage: '',
            userFoundMessage:'',
        };
        let isValid = true;
        if (!credentials.userName) {
            isValid = false;
            message.userNameMessage = "User name should not be empty"
        }
        if (!credentials.password) {
            isValid = false;
            message.passwordMessage = 'Password should not be empty'
        }
        setErrorMessage(message)
        if (isValid) {
            let validateAdminCredentials = async () => {
                console.log(credentials);
                try {
                    const response = await userLogIn(credentials.userName,credentials.password)
                    console.log(response.data);
                    localStorage.setItem("userName",response.data.userName);
                    navigate('/home')
                }
                catch (error) {
                    console.log(error.status);
                    if(error.status===404){
                        setErrorMessage({userFoundMessage : "Please complete your registration to access all features"})
                    }
                    else{
                        setErrorMessage({userFoundMessage : 'Enter proper credentials'})
                    }
                }
            }
            validateAdminCredentials();
        }
        // console.log(errorMessage);
    }
    return (
        <div className='h-screen flex items-center justify-center bg-stone-100'>
            <form onSubmit={handleFormSubmit}>
                <h1>Login Page</h1>
                <Input
                    label="Enter user name or email:"
                    type="text"
                    placeholder="Enter user name or email"
                    name="userName"
                    onChange={handleInputChange}
                    value={credentials.userName}
                    errorMessage={errorMessage.userNameMessage} />
                <Input
                    label="Enter Passowrd : "
                    type="password" name="password"
                    placeholder="Enter your password"
                    onChange={handleInputChange}
                    value={credentials.password}
                    errorMessage={errorMessage.passwordMessage}
                />
                <button type="submit">Login</button>
                {errorMessage.userFoundMessage && <h2 className='text-red-500 font-bold'>{errorMessage.userFoundMessage}</h2>}
                <span >Don&apos;t have an account &nbsp;
                    <span className='text-blue-600 cursor-pointer hover:text-blue-300' onClick={() => navigate("/register")}>Create Account</span >
                </span>
            </form>
        </div>
    )
}

export default Login