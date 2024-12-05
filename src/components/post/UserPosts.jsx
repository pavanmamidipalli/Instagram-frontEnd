import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Posts from "./Posts";
import {
  deleteUserByName,
  getPostsByUserName,
  getUserByName,
  POST,
  USER,
} from "../../auth";

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [isChanged, setIsChanged] = useState();
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();
  let userName = location.state.userName;
  let currentUserName = localStorage.getItem("userName");
  useEffect(() => {
    let handleUserPosts = async () => {
      try {
        let response = await getPostsByUserName(userName);
        console.log(response.data);
        setUserPosts(response.data);
        setLikes(
          response.data.map((post) => ({
            id: post.id,
            liked: post.likesDTOList.find(
              (like) =>
                like.userDto.userName === currentUserName &&
                like.isDeleted === false
            )
              ? true
              : false,
          }))
        );
      } catch (error) {
        console.error(error);
        setUserPosts([]);
      }
    };
    handleUserPosts();
  }, [isChanged, currentUserName, userName]);

  let handleBackHome = () => {
    navigate("/home");
  };

  let handleUpdate = async () => {
    try {
      let response = await getUserByName(userName);
      //    console.log(response.data.id)
      let id = response.data.id;
      navigate("/updateUser", {
        state: {
          id: id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  let handleDelete = async () => {
    try {
      let deleteResponse = await deleteUserByName(userName);
      console.log(deleteResponse.data);
      setDeleted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        navigate("/register");
      }, 1500);
    }
  };

  return (
    <>
      <ul className="m-5">
        <div className="flex justify-between mx-[120px]">
          <button
            className="p-2 px-3 rounded-md font-bold bg-red-300 hover:bg-red-500"
            onClick={handleBackHome}
          >
            Home
          </button>
          <div>
            {currentUserName === userName ? (
              <button
                className="p-2 px-2 mx-[5px] rounded-md font-bold bg-red-300 hover:bg-red-500"
                onClick={handleUpdate}
              >
                Update Account
              </button>
            ) : (
              ""
            )}
            {currentUserName === userName ? (
              <button
                className="p-2 px-3 rounded-md font-bold bg-red-300 hover:bg-red-500"
                onClick={handleDelete}
              >
                Delete Account
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        {userPosts.length != 0 ? (
          <Posts
            posts={userPosts}
            likes={likes}
            setIsChanged={setIsChanged}
            currentUserName={userName}
          />
        ) : (
          <h1 className="text-center">
            No Post found please Add posts{" "}
            <span
              className="cursor-pointer hover:underline text-blue-700 hover:text-blue-500"
              onClick={() => navigate("/addPost")}
            >
              By clicking here
            </span>
          </h1>
        )}
      </ul>
      {deleted && (
        <p className="text-red-500 text-center">Account deleted Sucessfulyy</p>
      )}
    </>
  );
};

export default UserPosts;
