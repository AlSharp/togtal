import axios from 'axios';

export function fetchPlacesAll() {
  return function(dispatch) {
    dispatch({type: 'FETCH_PLACES_ALL'});
    axios.get('/api/v1/stores')
      .then(response => {
        dispatch({type: 'FETCH_PLACES_ALL_FULFILLED', payload: response.data});
      })
      .catch((error) => {
        dispatch({type: 'FETCH_PLACES_ALL_REJECTED', payload: error})
      });
  }
}

export function fetchPlacesByViewport(props) {
  return function(dispatch) {
    dispatch({type: 'FETCH_PLACES_BY_VIEWPORT'});
    axios.get('/api/v1/places/grocery_stores/filter', {params: props})
      .then(response => {
        dispatch({type: 'FETCH_PLACES_BY_VIEWPORT_FULFILLED', payload: response.data});
      })
      .catch((error) => {
        dispatch({type: 'FETCH_PLACES_BY_VIEWPORT_REJECTED', payload: error})
      });
  }
}

export function handleAddNewPlace(props) {
  console.log(props);
  return function(dispatch) {
    dispatch({type: 'ADD_GROCERY_STORE'});
    axios.post('/api/v1/places/grocery_stores', props)
      .then(response => {
        dispatch({type: 'ADD_GROCERY_STORE_FULFILLED', payload: response.data});
      })
      .catch((error) => {
        dispatch({type: 'ADD_GROCERY_STORE_REJECTED', payload: error})
      });
  }
}