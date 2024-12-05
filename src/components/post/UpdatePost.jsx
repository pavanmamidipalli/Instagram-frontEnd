import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getPostById, POST, updatePost } from '../../auth';
import Input from '../input/Input';

const UpdatePost = () => {
    let location = useLocation();
    let postId = location.state.postId;
    
    const [post, setPost] = useState({
        id: postId,
        content: "",
        caption: ""
    });
    const [errorMessage, setErrorMessage] = useState({
        contentMessage: '',
        captionMessage: '',
        postedMessage: '',
    });
    let navigate = useNavigate();
    let handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost(({
            ...post,
            [name]: value,
        }))
    }
    
    useEffect(() => {
        let getPost = async () => {
            try {
                let response = await getPostById(postId)
                console.log(response.data)
                setPost(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getPost()
    }, [postId])
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
                    const response = await updatePost(post)
                    console.log(response);
                    setErrorMessage({ postedMessage: "Post Updated successfully" })
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
                <h1>Update Post</h1>
                <div className="flex flex-col">
                    <label>Enter Post Content </label>
                    <textarea className=" w-[350px]  h-20 p-2 border-[1px] rounded-md outline-none focus:border-blue-400 " name="content" placeholder="Enter Content" value={post.content} onChange={handleInputChange}></textarea>
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
                <button type="submit"> Post</button>
                {errorMessage.postedMessage && <h2 className='text-green-500 font-bold'>{errorMessage.postedMessage}</h2>}
            </form>
        </div>
    )
}

export default UpdatePost