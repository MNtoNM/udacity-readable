import _ from 'lodash';
import {  RECEIVE_CATEGORIES } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      console.log("Categories action.payload.categories: ", action.payload.categories)
      return _.mapKeys(action.payload.categories, "name");
      // return {...state, action.payload }
      // return {...state}
    default:
      return state;
  }
}
