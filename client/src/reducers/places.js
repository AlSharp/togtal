export default (state={
  places: [],
  viewport: {},
  fetching: false,
  fetched: false,
  fetching_error: null,
  adding: false,
  added: false,
  adding_error: null,
  }, action) => {
  
  switch (action.type) {
    
    // fetching all glocery stores
    
    case 'FETCH_PLACES_ALL': {
      return {...state, fetching: true, fetched: false}
    }
    case 'FETCH_PLACES_ALL_REJECTED': {
      return {...state, fetching: false, fetched: false, fetching_error: action.payload}
    }
    case 'FETCH_PLACES_ALL_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        places: action.payload,
      }
    }
    
    //fetching glocery stores by map viewport
    
    case 'FETCH_PLACES_BY_VIEWPORT': {
      return {...state, fetching: true, fetched: false}
    }
    case 'FETCH_PLACES_BY_VIEWPORT_REJECTED': {
      return {...state, fetching: false, fetched: false, fetching_error: action.payload}
    }
    case 'FETCH_PLACES_BY_VIEWPORT_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        places: action.payload,
      }
    }
    
    case 'ADD_GROCERY_STORE': {
      return {...state, adding: true}
    }
    case 'ADD_GROCERY_STORE_REJECTED': {
      return {...state, adding: false, adding_error: action.payload}
    }
    case 'ADD_GROCERY_STORE_FULFILLED': {
      return {
        ...state,
        adding: false,
        added: true,
        places: state.places.concat(action.payload),
      }
    }
  }
  return state;
}