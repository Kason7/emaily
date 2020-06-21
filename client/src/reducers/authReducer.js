import { FETCH_USER } from '../actions/types';

// This reducer adjust the state to the logged in user
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;

    default:
      return state;
  }
}
