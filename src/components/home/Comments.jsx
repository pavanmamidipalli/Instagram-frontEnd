import { useState } from "react";
import {
  addComment,
  COMMENTS,
  deleteComment,
  getAllCommentsByPostId,
  updateCommentApi,
} from "../../auth";
import { useNavigate } from "react-router-dom";
const Comments = ({ comments, setComments, postId, setIsChanged }) => {
  const [userComment, setUserComment] = useState("");
  const [commentPostedMessage, setCommentPostedMessage] = useState("");
  let userName = localStorage.getItem("userName");
  const [contentError, setContentError] = useState();
  const navigate = useNavigate();
  const [commentModified, setCommentModified] = useState("");
  const [commentUpdateClicked, setCommentUpdateClicked] = useState("");
  function handleOnChange(event) {
    setUserComment(event.target.value);
  }
  let handleAddComment = async (postId) => {
    let commentPayload = {
      commentText: userComment,
      postDto: {
        id: postId,
      },
    };
    if (userComment) {
      try {
        let savingResponse = await addComment(userName, commentPayload);
        console.log(savingResponse);
        setCommentPostedMessage("Comment Posted Sucessfully");
        setTimeout(async () => {
          updateComments();
          setCommentPostedMessage("");
        }, 1500);
        setContentError("");
      } catch (error) {
        console.error(error);
      } finally {
        setUserComment("");
      }
    } else {
      setContentError("Comment Should not be empty");
    }
  };
  let updateComments = async () => {
    try {
      const response = await getAllCommentsByPostId(postId);
      console.log(response.data);
      setComments(response.data);
      setIsChanged((pre) => !pre);
    } catch (error) {
      console.error(error);
      setComments([]);
    }
  };
  let handleUpdateComment = (commentId, commentText) => {
    setUserComment(commentText);
    setCommentUpdateClicked(commentId);
  };
  let updateComment = async (commentId) => {
    console.log(commentId);
    let commentPayLoad = {
      id: commentId,
      commentText: userComment,
    };
    try {
      let response = await updateCommentApi(commentPayLoad);
      console.log(response);
      setCommentModified("Comment updated Sucessfully");
      setTimeout(async () => {
        updateComments();
        setCommentModified("");
        setUserComment("");
        setCommentUpdateClicked("");
      }, 1000);
    } catch (error) {
      console.error(error);
      setCommentModified("");
    }
  };
  let handleDeleteComment = async (commentId) => {
    console.log(commentId);
    try {
      let response = await deleteComment(commentId);
      console.log(response);
      setCommentModified("Comment deleted Sucessfully");
      setTimeout(async () => {
        updateComments();
        setCommentModified("");
      }, 1500);
    } catch (error) {
      console.error(error);
      setCommentModified("");
    }
  };
  // console.log(comments);
  return (
    <div className="mt-4 bg-gray-100  border rounded-md p-3 ">
      <h3 className="font-bold  text-red-500 mb-2">Comments</h3>
      <div className="h-56 overflow-y-scroll">
        {comments.length != 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className=" mb-2">
              <div className="flex justify-between items-center gap-x-5">
                <div>
                  <p
                    className=" w-fit text-lg font-medium cursor-pointer hover:underline hover:text-red-500"
                    onClick={() =>
                      navigate("/userPosts", {
                        state: { userName: comment.userDto.userName },
                      })
                    }
                  >
                    {comment.userDto.userName}
                  </p>
                  <p className="text-sm">{comment.commentText}</p>
                </div>
                {userName === comment.userDto.userName && (
                  <div className="pr-5 ">
                    <button
                      className="p-1 mx-[5px] rounded-md font-bold bg-red-300 hover:bg-red-500"
                      onClick={() =>
                        handleUpdateComment(comment.id, comment.commentText)
                      }
                    >
                      Update
                    </button>
                    <button
                      className="p-1 rounded-md font-bold bg-red-300 hover:bg-red-500"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <p className="text-[10px]">
                {new Date(comment.updatedAt).toLocaleString()}
              </p>
              {commentUpdateClicked && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white w-96 flex items-center gap-y-4 flex-col p-4 rounded shadow font-bold">
                    <h1 className="font-bold text-fuchsia-600">
                      Update Comment
                    </h1>
                    <textarea
                      className="w-full p-2 h-20 rounded-md text-black outline-none  border-red-700 bg-red-100 focus:border-[1px]"
                      placeholder="Enter your comment"
                      name="userComment"
                      value={userComment}
                      onChange={handleOnChange}
                    ></textarea>
                    <button
                      className="bg-red-500 h-10 font-bold p-1 px-3 text-white rounded-md hover:bg-red-700"
                      onClick={() => updateComment(commentUpdateClicked)}
                    >
                      Update
                    </button>
                    {commentModified && (
                      <p className="text-center font-bold text-green-500">
                        {commentModified}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        )}
      </div>
      <div className="w-full flex justify-end items-center pr-3 gap-x-2">
        <textarea
          className="w-full p-2 rounded-md text-black outline-none  border-red-700 bg-red-100 focus:border-[1px]"
          placeholder="Enter your comment"
          name="userComment"
          value={userComment}
          onChange={handleOnChange}
        ></textarea>
        <button
          className="bg-red-500 h-10 font-bold p-1 px-3 text-white rounded-md hover:bg-red-700"
          onClick={() => handleAddComment(postId)}
        >
          Add
        </button>
      </div>
      {contentError && (
        <p className="text-center font-bold text-red-500">{contentError}</p>
      )}
      {commentPostedMessage && (
        <p className="text-center font-bold text-green-500">
          {commentPostedMessage}
        </p>
      )}
      {commentModified && (
        <p className="text-center font-bold text-green-500">
          {commentModified}
        </p>
      )}
    </div>
  );
};
export default Comments;
