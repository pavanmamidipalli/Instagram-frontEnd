import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart as faRegularHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import Comments from "../home/Comments";
import LikedUsers from "../home/LikedUsers";

import {
  addLike,
  COMMENTS,
  deletePost,
  getAllCommentsByPostId,
  getAllPostById,
  LIKE,
  POST,
  updateLike,
} from "../../auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({
  post,
  isPostLiked,
  posts,
  setIsChanged,
  currentUserName,
}) => {
  const [comments, setComments] = useState([]);
  const [activePostIdForComments, setActivePostIdForComments] = useState(null);
  const [activePostIdForLikes, setActivePostIdForLikes] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  const navigate = useNavigate();

  const [postDeleteMessage, setPostDeleteMessage] = useState();
  const [getComments, setUpdateComments] = useState(null);
  let userName = localStorage.getItem("userName");

  let handleLike = (postId) => {
    let likeObject = {};
    const liked = posts.find(
      (post) =>
        post.id === postId &&
        post.likesDTOList.find((like) => like.userDto.userName === userName)
    );
    // console.log(liked);
    if (liked) {
      let post = posts.find((post) => post.id === postId);
      let like = post.likesDTOList.filter(
        (like) => like.userDto.userName === userName
      );
      // console.log(like);
      likeObject = {
        id: like[0].id,
      };
      // useEffect(()=>{
      //     console.log("hello")
      // },[])
      let handleUpdateLike = async () => {
        try {
          let response = await updateLike(likeObject);
          console.log(response);
          setIsChanged((pre) => !pre);
        } catch (error) {
          console.error(error);
        }
      };
      handleUpdateLike();
    } else {
      likeObject = {
        postDto: {
          id: postId,
        },
      };
      let handleAddLike = async () => {
        try {
          let response = await addLike(userName, likeObject);
          console.log(response);
          setIsChanged((pre) => !pre);
        } catch (error) {
          console.error(error);
        }
      };
      handleAddLike();
    }
  };

  let handleViewLikedUsers = async (postId) => {
    console.log(postId)
    setActivePostIdForComments(null);
    if (activePostIdForLikes === postId) {
      setActivePostIdForLikes("");
      return;
    }
    try {
      console.log(postId)
      let response = await getAllPostById(postId);
      console.log(response.data);
      setLikedUsers(response.data);
    } catch (error) {
      console.error(error);
      setLikedUsers([]);
    } finally {
      setActivePostIdForLikes(postId);
    }
  };
  const handleComments = async (postId) => {
    setActivePostIdForLikes(null);
    if (activePostIdForComments === postId) {
      setUpdateComments(null);
      setActivePostIdForComments(null);
      return;
    }
    try {
      const response = await getAllCommentsByPostId(postId);
      console.log(response.data);
      setComments(response.data);
      setIsChanged((pre) => !pre);
    } catch (error) {
      console.error(error);
      setComments([]);
    } finally {
      setActivePostIdForComments(postId);
    }
  };
  function handleUpdate(postId) {
    navigate("/updatePost", {
      state: {
        postId: postId,
      },
    });
  }
  let handleDeletePost = async (postId) => {
    try {
      let response = await deletePost(postId);
      console.log(response);
      setPostDeleteMessage("Post Sucessfully deleted");
      setTimeout(() => {
        setIsChanged((pre) => !pre);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h1
          className="font-bold cursor-pointer hover:underline hover:text-red-500"
          onClick={() =>
            navigate("/userPosts", {
              state: { userName: post.userDto.userName },
            })
          }
        >
          {post.userDto.userName}
        </h1>

        {currentUserName === userName && (
          <ul className="flex gap-x-4 rounded-lg text-gray-800 ">
            <li
              className="px-4 py-2 rounded-md bg-red-400 hover:bg-red-600 cursor-pointer"
              onClick={() => handleDeletePost(post.id)}
            >
              Delete
            </li>
            <li
              className="px-4 py-2 rounded-md bg-red-400 hover:bg-red-600 cursor-pointer"
              onClick={() => handleUpdate(post.id)}
            >
              Update
            </li>
          </ul>
        )}
      </div>
      <p className=" font-medium mb-2 pl-3">{post.content}</p>
      <p className="text-gray-800 mb-1 pl-3">{post.caption}</p>
      <p className="text-gray-500 text-sm mb-3">
        {new Date(post.updatedAt).toLocaleString()}
      </p>
      <div className="flex items-center gap-x-4">
        <span className="flex items-center gap-x-1 cursor-pointer">
          <FontAwesomeIcon
            onClick={() => handleLike(post.id)}
            icon={isPostLiked ? faSolidHeart : faRegularHeart}
            className={isPostLiked ? "text-red-600" : ""}
          />
          <p
            className="text-xs cursor-pointer"
            onClick={() => handleViewLikedUsers(post.id)}
          >
            {
              post.likesDTOList.filter((like) => like.isDeleted === false)
                .length
            }
          </p>
        </span>
        <span
          className="flex items-center gap-x-1 cursor-pointer"
          onClick={() => handleComments(post.id)}
        >
          <FontAwesomeIcon icon={faComment} />
          {post.commentsDTOList.length > 0 && (
            <p className="text-sm">{post.commentsDTOList.length}</p>
          )}
        </span>
      </div>
      {postDeleteMessage && (
        <h1 className="text-center text-green-500 font-bold">
          {" "}
          {postDeleteMessage}
        </h1>
      )}

      {activePostIdForComments === post.id ? (
        <Comments
          comments={comments}
          postId={post.id}
          setIsChanged={setIsChanged}
          set
          setComments={setComments}
        />
      ) : (
        ""
      )}
      {activePostIdForLikes === post.id && (
        <LikedUsers likedUsers={likedUsers} />
      )}
    </>
  );
};

export default PostCard;
