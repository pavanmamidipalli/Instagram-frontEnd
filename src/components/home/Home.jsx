import { useEffect, useState } from "react";
import { getAllPost, getMatchedUser, POST, USER } from "../../auth";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";
import Posts from "../post/Posts";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState([]);
  const [isChanged, setIsChanged] = useState();
  const [searchedUserName, setSearchedUserName] = useState();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  let userName = localStorage.getItem("userName");
  useEffect(() => {
    let getAllPosts = async () => {
      try {
        let response = await getAllPost();
        setPosts(response.data);
        console.log(response.data);
        setLikes(
          response.data.map((post) => ({
            id: post.id,
            liked: post.likesDTOList.find(
              (like) =>
                like.userDto.userName === userName && like.isDeleted === false
            )
              ? true
              : false,
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        // setIsChanged(pre=> !pre)
      }
    };
    getAllPosts();
  }, [isChanged, userName]);
  let handleAddPost = () => {
    navigate("/addPost");
  };
  let handleLogOut = () => {
    navigate("/");
    localStorage.clear();
  };
  let searchUserByName = async (searchUser) => {
    try {
      let usersResponse = await getMatchedUser(searchUser);
      setUsers(usersResponse.data);
      console.log(usersResponse);
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  };
  let handleInputChange = (event) => {
    setSearchedUserName(event.target.value);
    searchUserByName(event.target.value);
  };
  let handleSearchUser = () => {
    if (searchedUserName) {
      searchUserByName(searchedUserName);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="m-5">
          <div className="text-center flex justify-evenly">
            <div className="flex gap-x-4">
              <input
                placeholder="Enter user name"
                className=" w-96 p-2 rounded-2 border-[1px] outline-none focus:border-blue-500 fo"
                onChange={handleInputChange}
              />
              <button
                className="p-2 px-3 rounded-md font-bold bg-red-300 hover:bg-red-500 "
                onClick={handleSearchUser}
              >
                Search
              </button>
            </div>
            <div className="flex gap-x-4">
              <button
                className="p-2 px-3 rounded-md font-bold bg-red-300 hover:bg-red-500"
                onClick={handleAddPost}
              >
                Add Post
              </button>
              <button
                className="p-2 px-3 rounded-md font-bold bg-red-300 hover:bg-red-500"
                onClick={() =>
                  navigate("/userPosts", {
                    state: { userName: localStorage.getItem("userName") },
                  })
                }
              >
                My Posts
              </button>
              <button
                className="p-2 px-3 rounded-md font-bold  bg-red-300 hover:bg-red-500"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
          </div>
          {searchedUserName && (
            <div className="bg-gray-100 mx-28 p-2 my-2 rounded-md h-40 overflow-y-scroll">
              {users.length != 0 ? (
                <ul>
                  {users.map((user) => {
                    return (
                      <p
                        key={user.id}
                        onClick={() =>
                          navigate("/userPosts", {
                            state: { userName: user.userName },
                          })
                        }
                        className="font-semibold p-2 w-fit hover:text-red-600 cursor-pointer "
                      >
                        {user.userName}
                      </p>
                    );
                  })}
                </ul>
              ) : (
                <p className=" text-center pt-5">No users found</p>
              )}
            </div>
          )}
          <Posts posts={posts} likes={likes} setIsChanged={setIsChanged} />
        </div>
      )}
    </>
  );
};
export default Home;
