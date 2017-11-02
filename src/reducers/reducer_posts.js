import _ from 'lodash';
import {  RECEIVE_POSTS, FETCH_POST, DELETE_POST, CREATE_POST, POSTVOTE_INCREMENT,
        POSTVOTE_DECREMENT } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    // case FETCH_POSTS:
      // return _.mapKeys(action.payload.data, "id");
    case RECEIVE_POSTS:
      return _.mapKeys(action.posts, "id");

      // return {...state, posts: action.posts}
    case FETCH_POST:
      return { ...state, [action.payload.data.id]: action.payload.data  };
    case DELETE_POST:
      return _.omit(state, action.payload);
    case CREATE_POST:
    // console.log("action", action);
      return {...state, [action.payload.id]: action.payload}
      // return state.concat([action.payload])
      // return Object.assign({}, state, [action.payload.id]: action.payload )
    case POSTVOTE_INCREMENT:
      console.log("state from reducer: ", state);
      console.log("action: ", action);
      console.log("action.result: ", action.result)
      return {...state, [action.result.id]: action.result};
    case POSTVOTE_DECREMENT:
      return {...state, [action.result.id]: action.result};

    default:
      return state;
  }
}
