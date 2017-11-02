import _ from 'lodash';
import { FETCH_COMMENTS, COMMENTVOTE_INCREMENT, COMMENTVOTE_DECREMENT, DELETE_COMMENT, CREATE_COMMENT, FETCH_COMMENT  } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return _.mapKeys(action.payload.data, "id");
    // case FETCH_POST:
      // return { ...state, [action.payload.data.id]: action.payload.data  };
    case FETCH_COMMENT:
      return { ...state, [action.payload.data.id]: action.payload.data  };
    case DELETE_COMMENT:
      return _.omit(state, action.payload);
    case CREATE_COMMENT:
    console.log("Action from reducer: ", action)
      return {...state, [action.payload.id]: action.payload }
    case COMMENTVOTE_INCREMENT:
    // console.log("state from reducer: ", state);
    // console.log("action: ", action);
    // console.log("action.result: ", action.result)
      return {...state, [action.result.id]: action.result};
    case COMMENTVOTE_DECREMENT:
      return {...state, [action.result.id]: action.result};

    default:
      return state;
  }
}
