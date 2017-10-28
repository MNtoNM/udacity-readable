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

function createPostSuccess(data) {
    return {
        type: CREATE_POST,
        payload: data
    };
}

export function createPost(values, callback) {
    const { title, body, author, category } = values;

    const data = {
        id: uuid(),
        timestamp: Date.now(),
        title,
        body,
        author,
        category
    }

    return dispatch => {
        axios.post(`${ROOT_URL}/posts`, data, config)
            .then(res => {
                callback();
                dispatch(createPostSuccess(res.data));
            });

    }
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}`, config)

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost(post, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${post.id}`, config)
  .then(() => callback());

  return {
    type: DELETE_POST,
    payload: post
  }
}

// Increment Posts

export const POSTVOTE_INCREMENT = 'POSTVOTE_INCREMENT';
export const POST_UPVOTE = 'POST_UPVOTE';

export function postUpVote(){
  return {
    type: POST_UPVOTE
  }
}

export function getUpVote(json) {
  return {
    type: POSTVOTE_INCREMENT,
    result: json,
  }
}

export function postVoteIncrement(post) {
  console.log('POST from top of pvi: ', post)
  return function (dispatch){
    dispatch(postUpVote())
    return fetch(`${ROOT_URL}/posts/${post.id}`, {headers: {"Authorization": "Whatever", "Content-Type": "application/json"}, method: 'POST', body: JSON.stringify({"option": "upVote"}) })
      .then(response => response.json())
      .then(json => {dispatch(getUpVote(json))})
  }
}

// Decrement Posts
export const POSTVOTE_DECREMENT = 'POSTVOTE_DECREMENT';
export const POST_DOWNVOTE = 'POST_DOWNVOTE';

export function postDownVote(){
  return {
    type: POST_DOWNVOTE
  }
}

export function getDownVote(json) {
  return {
    type: POSTVOTE_DECREMENT,
    result: json,
  }
}

export function postVoteDecrement(post) {
  return function (dispatch){
    dispatch(postDownVote())
    return fetch(`${ROOT_URL}/posts/${post.id}`, {headers: {"Authorization": "Whatever", "Content-Type": "application/json"}, method: 'POST', body: JSON.stringify({'option': 'downVote'}) })
      .then(response => response.json())
      .then(json => {dispatch(getDownVote(json))})
  }
}
