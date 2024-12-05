
import Input from "../input/Input"
import { addPost, POST } from "../../auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddPost = () => {
    const [post, setPost] = useState({
        content: '',
        caption: '',
    });
    const [errorMessage, setErrorMessage] = useState({
        contentMessage: '',
        captionMessage: '',
        postedMessage: '',
    });
    let navigate = useNavigate();
    let userName = localStorage.getItem("userName");

    let handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost(({
            ...post,
            [name]: value,
        }))
    }
    let handleFormSubmit = (event) => {
        event.preventDefault();
        let message = {
            contentMessage: '',
            captionMessage: '',
            postedMessage: '',
        };
        let isValid = true;
        if (!post.content) {

            message.contentMessage = "Content should not be empty"
            isValid = false;
        }
        if (!post.caption) {
            message.captionMessage = 'Caption should not be empty'
            isValid = false;
        }
        setErrorMessage(message)
        if (isValid) {
            let handleAddPost = async () => {
                console.log(post);
                try {
                    const response = await addPost(userName,post);
                    console.log(response);
                    setErrorMessage({ postedMessage: "Posted successfully" })
                    setTimeout(() => {
                        navigate('/home')
                    }, 1000)
                }
                catch (error) {
                    console.log(error.response);
                }
            }
            handleAddPost();
        }
    }
    let handleBackHome = () => {
        navigate('/home')
    }
    
    return (
        <div className='h-screen flex flex-col items-center justify-center bg-stone-100'>
            <div className="w-[450px] ">
                <button className="p-2 px-3 rounded-md font-bold bg-red-300 hover:bg-red-500" onClick={handleBackHome} >Back Home</button>

            </div>
            <form onSubmit={handleFormSubmit}>

                <h1>Add Post</h1>
                <div className="flex flex-col">
                    <label>Enter Post Content </label>
                    <textarea className=" w-[350px]  h-20 p-2 border-[1px] rounded-md outline-none focus:border-blue-400 " name="content" placeholder="Enter Content" onChange={handleInputChange}></textarea>
                    {errorMessage.contentMessage && <p className="text-red-500">{errorMessage.contentMessage}</p>}
                </div>

                <Input
                    label="Enter Caption : "
                    type="text" name="caption"
                    placeholder="Enter caption"
                    onChange={handleInputChange}
                    value={post.caption}
                    errorMessage={errorMessage.captionMessage}
                />
                <button type="submit">Add Post</button>
                {errorMessage.postedMessage && <h2 className='text-green-500 font-bold'>{errorMessage.postedMessage}</h2>}
                {/* <span >Don&apos;t have an account &nbsp;
                    <span className='text-blue-600 cursor-pointer hover:text-blue-300' onClick={() => navigate("/register")}>Create Account</span >
                </span> */}
            </form>
        </div>
    )
}

export default AddPost