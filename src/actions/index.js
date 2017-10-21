import axios from 'axios';
import uuid from 'uuid';


const ROOT_URL = "http://localhost:3001"

const config = {
  headers: { 'Authorization': 'whatever' }
};

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts`, config);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

// export function createPost(values, callback) {
//   const request = axios.post(`${ROOT_URL}/posts`, values, config )
//   .then(() => callback());
//
//   return (dispatch) => {
//     request.then(( {data} ) => {
//       dispatch({
//         type: CREATE_POST,
//         id: uuid(),
//         timestamp: Date.now,
//         payload: data
//       })
//     })
//   };
// }

export const addPost = (post) => {
  return fetch(`${ROOT_URL}/posts`, {
    method: 'POST',
    headers: config,
    body: JSON.stringify(post)
  })
}

export const createPost = (post, callback) => {
  return (dispatch) => {
    addPost(post).then(() => callback())
    dispatch({ type: CREATE_POST, post })
  }
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}`, config)

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}`, config)
  .then(() => callback());

  return {
    type: DELETE_POST,
    payload: id
  }
}
