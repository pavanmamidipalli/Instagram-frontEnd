import axios from "axios";
let BASE_URL = "http://localhost:8080";

export const userRegister = async (data) => {
  const response = await axios.post(`${BASE_URL}/api/user/save`, data);
  return response;
};

export const userLogIn = async (userName, password) => {
  const response = await axios.post(
    `${BASE_URL}/api/user/login/${userName}/${password}`
  );
  return response;
};
export const getMatchedUser = async (data) => {
  const response = await axios.get(
    `${BASE_URL}/api/user/get-matched-user/${data}`
  );
  return response;
};
export const updateUser = async (data) => {
  const response = await axios.put(`${BASE_URL}/api/user/update-user`, data);
  return response;
};
export const getUserByName = async (userName) => {
  const response = await axios.get(
    `${BASE_URL}/api/user/get-by-user-name/${userName}`
  );
  return response;
};
export const deleteUserByName = async (userName) => {
  const response = await axios.delete(
    `${BASE_URL}/api/user/delete-user-by-userName/${userName}`
  );
  return response;
};

export const USER = {
  // REGISTER : `${BASE_URL}/api/user/save`,
  // LOGIN : `${BASE_URL}/api/user/login`,
  GET_MATCHED_USER: `${BASE_URL}/api/user/get-matched-user`,
  UPDATE_USER: `${BASE_URL}/api/user/update-user`,
  GET_USER_BY_NAME: `${BASE_URL}/api/user/get-by-user-name`,
  DELETE_USER: `${BASE_URL}/api/user/delete-user-by-userName`,
};

export const getAllPost = async () => {
  const response = await axios.get(`${BASE_URL}/api/post/get-all`);
  return response;
};
export const deletePost = async (id) => {
  const response = await axios.delete(`${BASE_URL}/api/post/delete-post/${id}`);
  return response;
};
export const addPost = async (userName, post) => {
  const response = await axios.post(
    `${BASE_URL}/api/post/save-post-by-username/${userName}`,
    post
  );
  return response;
};

export const getPostById = async (id) => {
  const response = await axios.get(`${BASE_URL}/api/post/get-post-by-id/${id}`);
  return response;
};
export const updatePost = async (post) => {
  const response = await axios.put(`${BASE_URL}/api/post/update-post`, post);
  return response;
};
export const getPostsByUserName = async (userName) => {
  const response = await axios.get(
    `${BASE_URL}/api/post/get-all-posts-by-user-name/${userName}`
  );
  return response;
};
export const POST = {
  ADD_POST: `${BASE_URL}/api/post/save-post-by-username`,
  GET_BY_ID: `${BASE_URL}/api/post/get-post-by-id`,
  GET_ALL: `${BASE_URL}/api/post/get-all`,
  DELETE: `${BASE_URL}/api/post/delete-post`,
  UPDATE: `${BASE_URL}/api/post/update-post`,
  GET_ALL_BY_USER_NAME: `${BASE_URL}/api/post/get-all-posts-by-user-name`,
};
export const updateLike = async (data) => {
  const response = await axios.put(`${BASE_URL}/api/likes/update`, data);
  return response;
};
export const addLike = async (userName, likeObject) => {
  const response = await axios.post(
    `${BASE_URL}/api/likes/save/${userName}`,
    likeObject
  );
  return response;
};
export const getAllPostById = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/api/likes/get-all-likes-by-post-id/${id}`
  );
  return response;
};
export const LIKE = {
  ADD: `${BASE_URL}/api/likes/save`,
  UPDATE: `${BASE_URL}/api/likes/update`,
  GET_ALL_BY_POST_ID: `${BASE_URL}/api/likes/get-all-likes-by-post-id`,
};

export const getAllCommentsByPostId = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/api/comment/get-all-comments-by-post-id/${id}`
  );
  return response;
};
export const addComment = async (userName, commentPayLoad) => {
  const response = await axios.post(
    `${BASE_URL}/api/comment/save/${userName}`,
    commentPayLoad
  );
  return response;
};

export const updateCommentApi = async (commentPayLoad) => {
  const response = await axios.put(
    `${BASE_URL}/api/comment/update`,
    commentPayLoad
  );
  return response;
};
export const deleteComment = async (id) => {
  const response = await axios.delete(`${BASE_URL}/api/comment/delete/${id}`);
  return response;
};

export const COMMENTS = {
  ADD: `${BASE_URL}/api/comment/save`,
  UPDATE: `${BASE_URL}/api/comment/update`,
  DELETE: `${BASE_URL}/api/comment/delete`,
  GET_ALL_BY_POST_ID: `${BASE_URL}/api/comment/get-all-comments-by-post-id`,
};
