import axios from 'axios';
import uuid from 'uuid';

const ROOT_URL = "http://localhost:3001"

const config = {
  headers: { 'Authorization': 'whatever' }
};

// Fetch List of Categories
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

function requestCategories() {
  return {
    type: REQUEST_CATEGORIES
  }
}

export function receiveCategories(data) {
  return {
    type: RECEIVE_CATEGORIES,
    payload: data
  }
}

export function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories())
    return axios.get(`${ROOT_URL}/categories`, config)
      .then(response => response.data)
      .then(data => dispatch(receiveCategories(data)))
  }
}

// Fetch List of Posts
export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';


export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';



export function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

export function receivePosts(data) {
  return {
    type: RECEIVE_POSTS,
    posts: data
  }
}

export function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts())
    return axios.get(`${ROOT_URL}/posts`, config)
      .then(response => response.data)
      .then(data => dispatch(receivePosts(data)))
  }
}


// Create a new post
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
                console.log("response: ", res);
                dispatch(createPostSuccess(res.data));
                console.log("dispatched createPostSuccess")
                callback();
                console.log("callback called")
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

export function deletePost(id, callback) {
  console.log("ID in delete actoin: ", id)
  const request = axios.delete(`${ROOT_URL}/posts/${id}`, config)
  .then(() => callback());

  return {
    type: DELETE_POST,
    payload: id
  };
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

// Sort Posts Index by either date or voteScore

export const SORT_BY = 'SORT_BY';

export const sortBy = (sort) => ({
  type: SORT_BY,
  payload: sort
});


// Fetch Comments
export const FETCH_COMMENTS = 'FETCH_COMMENTS';

export function fetchComments(postId) {
  const request = axios.get(`${ROOT_URL}/posts/${postId}/comments`, config);

  return {
    type: FETCH_COMMENTS,
    payload: request
  };
}

// CommentVote Increment
export const COMMENTVOTE_INCREMENT = 'COMMENTVOTE_INCREMENT';
export const POST_COMMENT_UPVOTE = 'POST_COMMENT_UPVOTE';

export function postCommentUpVote(){
  return {
    type: POST_COMMENT_UPVOTE
  }
}

export function getCommentUpVote(json) {
  return {
    type: COMMENTVOTE_INCREMENT,
    result: json,
  }
}

export function commentVoteIncrement(comment) {
  console.log("The Comment: ", comment)
  return function (dispatch) {
    dispatch(postCommentUpVote())
    return fetch(`${ROOT_URL}/comments/${comment}`, {headers: {"Authorization": "Whatever", "Content-Type": "application/json"}, method: 'POST', body: JSON.stringify({"option": "upVote"}) })
      .then(response => response.json())
      .then(json => {dispatch(getCommentUpVote(json))})
  }
}

// CommentVote Decrement
export const COMMENTVOTE_DECREMENT = 'COMMENTVOTE_DECREMENT';
export const POST_COMMENT_DOWNVOTE = 'POST_COMMENT_DOWNVOTE';

export function postCommentDownVote(){
  return {
    type: POST_COMMENT_DOWNVOTE
  }
}

export function getCommentDownVote(json) {
  return {
    type: COMMENTVOTE_DECREMENT,
    result: json,
  }
}

export function commentVoteDecrement(comment) {
  console.log("The Comment: ", comment)
  return function (dispatch) {
    dispatch(postCommentDownVote())
    return fetch(`${ROOT_URL}/comments/${comment}`, {headers: {"Authorization": "Whatever", "Content-Type": "application/json"}, method: 'POST', body: JSON.stringify({"option": "downVote"}) })
      .then(response => response.json())
      .then(json => {dispatch(getCommentDownVote(json))})
  }
}

// Create Comment
export const CREATE_COMMENT = 'CREATE_COMMENT';

function createCommentSuccess(data) {
    return {
        type: CREATE_COMMENT,
        payload: data
    };
}

export function createComment(values, parentId) {
  console.log("THE VALUES: ", values);
    const data = {
        id: uuid(),
        timestamp: Date.now(),
        body: values.body,
        author: values.author,
        body: values.body,
        author: values.author,
        parentId
    }
    console.log("data object has been created: ", data);


    return dispatch => {
      console.log("DATA: ", data)
        axios.post(`${ROOT_URL}/comments`, data, config)
            .then(res => {
                console.log(" create comment response: ", res);
                // console.log("res.data: ", res.data)
                dispatch(createCommentSuccess(res.data));
                console.log("dispatched createCommentSuccess")
                // callback();
                // console.log("comment callback called")
            });

    }
}


// Edit a Comment, Part 1/2: fetch the relevant comment via API
export const REQUEST_COMMENT = 'REQUEST_COMMENT';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const FETCH_COMMENT = 'FETCH_COMMENT';


export function requestComment(id) {
  return {
    type: REQUEST_COMMENT,
    id
  }
}

export function receiveComment(data) {
  return {
    type: RECEIVE_COMMENT,
    payload: data
  }
}

export function fetchComment(id) {
  return function (dispatch){
    dispatch(requestComment(id))
    return fetch(`${ROOT_URL}/comments/${id}`, {headers: {"Authorization": "Whatever", "Content-Type": "application/json"}, method: 'GET' })
      .then(response => response.json())
      .then(json => {dispatch(receiveComment(json))})
  }
}

// Edit a Comment, Part 2/2: Update the comment body
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

function updateCommentSuccess(data) {
    return {
        type: UPDATE_COMMENT,
        payload: data
    };
}

export function updateComment(id, comment) {
  console.log("COMMENT from updateComment", comment)
  const data = {
    body: comment
  }

return dispatch => {
  console.log("DATA: ", data)
    axios.put(`${ROOT_URL}/comments/${id}`, data, config)
        .then(res => {
            console.log(" create comment response: ", res);
            console.log("res.data: ", res.data)
            dispatch(updateCommentSuccess(res.data));
            console.log("dispatched updateCommentSuccess")
            // callback();
            // console.log("comment callback called")
        });
    }
}



// Delete Comment
export const DELETE_COMMENT = 'DELETE_COMMENT';

export function deleteComment(id, callback) {
  console.log("ID in delete actoin: ", id)
  const request = axios.delete(`${ROOT_URL}/comments/${id}`, config)
  .then(() => callback());

  return {
    type: DELETE_COMMENT,
    payload: id
  };
}
