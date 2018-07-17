import { 
  FETCH_RESTAURANTS,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAILURE,
  CREATE_RESTAURANT,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_FAILURE
} from '../actionTypes'

const initialState = {
  fetching: false,
  restaurants: [],
  errors: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_RESTAURANTS: return { ...state, fetching: true, errors: [] };
    case FETCH_RESTAURANTS_FAILURE: return { ...state, fetching: false, errors: action.errors };
    case FETCH_RESTAURANTS_SUCCESS: return { ...state, fetching: false, restaurants: action.payload };
    case CREATE_RESTAURANT: return { ...state, fetching: true, errors: [] };
    case CREATE_RESTAURANT_FAILURE: return { ...state, fetching: false, errors: action.errors };
    case CREATE_RESTAURANT_SUCCESS: return { ...state, fetching: false, restaurants: [...state.restaurants, action.payload] };
    default: return state
  }
}