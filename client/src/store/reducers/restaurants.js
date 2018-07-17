import { 
  FETCH_RESTAURANTS,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAILURE,
  CREATE_RESTAURANT,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_NAME,
  UPDATE_RESTAURANT_NAME__SUCCESS,
  UPDATE_RESTAURANT_NAME__FAILURE,
  UPDATE_RESTAURANT_ADDRESS,
  UPDATE_RESTAURANT_ADDRESS__SUCCESS,
  UPDATE_RESTAURANT_ADDRESS__FAILURE,
} from '../actionTypes'

const initialState = {
  fetching: false,
  restaurants: [],
  errors: [],
  updateErrors: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_RESTAURANTS: return { ...state, fetching: true, errors: [] };
    case FETCH_RESTAURANTS_FAILURE: return { ...state, fetching: false, errors: action.errors };
    case FETCH_RESTAURANTS_SUCCESS: return { ...state, fetching: false, errors: [], restaurants: action.payload };
    case CREATE_RESTAURANT: return { ...state, fetching: true, errors: [] };
    case CREATE_RESTAURANT_FAILURE: return { ...state, fetching: false, errors: action.errors };
    case CREATE_RESTAURANT_SUCCESS: return { ...state, fetching: false, errors: [], restaurants: [...state.restaurants, action.payload] };
    case DELETE_RESTAURANT: return { ...state, fetching: true, errors: [] };
    case DELETE_RESTAURANT_FAILURE: return { ...state, fetching: false, errors: action.errors };
    case DELETE_RESTAURANT_SUCCESS: return { ...state, fetching: false, errors: [], restaurants: state.restaurants.filter(val => {
      return val._id !== action.payload._id
    })};
    case UPDATE_RESTAURANT_NAME: return { ...state, fetching: true, errors: [] }
    case UPDATE_RESTAURANT_NAME__SUCCESS: return { ...state, fetching: false, errors: [], restaurants: state.restaurants.map(val => {
      if(val._id === action.payload._id) {
        return action.payload
      } else {
        return val
      }
    })}
    case UPDATE_RESTAURANT_NAME__FAILURE: return { ...state, fetching: false, updateErrors: action.errors }
    case UPDATE_RESTAURANT_ADDRESS: return { ...state, fetching: true, errors: [] };
    case UPDATE_RESTAURANT_ADDRESS__SUCCESS: return { ...state, fetching: false, errors: [], restaurants: state.restaurants.map(val => {
      if(val._id === action.payload._id) {
        return action.payload
      } else {
        return val
      }
    })}
    case UPDATE_RESTAURANT_ADDRESS__FAILURE: return { ...state, fetching: false, updateErrors: action.errors };
    default: return state
  }
}