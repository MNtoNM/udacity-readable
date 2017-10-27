import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST, CREATE_POST, POSTVOTE_INCREMENT,
        POSTVOTE_DECREMENT } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, "id");
    case FETCH_POST:
      return { ...state, [action.payload.data.id]: action.payload.data  };
    case DELETE_POST:
      return _.omit(state, action.payload);
    case CREATE_POST:
      return {...state, [action.id]: action.payload.data }
      // return state.concat([action.post])
      // return Object.assign({}, state, [action.id]: action.payload.data )
    case POSTVOTE_INCREMENT:
    // console.log(state);
      // return {...state, [action.result.id]: action.result};
      return {
       ...state,
       posts: _.map(state.posts, post => {
         console.log("POST from reducer: ", post);
         if(post.id === action.result.id)
           return Object.assign({}, post, {voteScore: action.result.voteScore})
           console.log("End of reducer", post)
         return post
       })
     }
    case POSTVOTE_DECREMENT:
      return {...state, [action.result.id]: action.result};

    default:
      return state;
  }
}
