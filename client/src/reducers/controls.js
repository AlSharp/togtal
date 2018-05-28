export default function(state={
  map: {},
  haveGoogleMapViewportWidth: false,
  googleMapViewportWidth: null,
  googleMapFirstLoad: true,
  listOfPlacesOpened: true,
  placingNewMarker: false,
  newPlaceMarkerCoord: {long: null, lat: null},
  newPlaceFormOpened: false,
  sidePanelState: 1,
  // 0 - side panel is closed,
  // 1 - initial state,
  // 2 - side panel is expanded
  }, action) {
  
  switch (action.type) {
    case 'PASS_MAP_OBJECT_TO_REDUX_STORE': {
      return {
        ...state,
        map: action.payload
      }
    }
    case 'FIRST_LOAD_OF_GOOGLE_MAP': {
      return {
        ...state,
        googleMapFirstLoad: false,
        haveGoogleMapViewportWidth: true,
      }
    }
    case 'GOOGLE_MAP_VIEWPORT_WIDTH_CHANGE': {
      return {
        ...state,
        haveGoogleMapViewportWidth: true,
        googleMapViewportWidth: action.payload
      }
    }
    case 'ADD_NEW_PLACE_BUTTON_CLICK': {
      return {
        ...state,
        listOfPlacesOpened: false,
        sidePanelState: 2,
        newPlaceFormOpened: true,
      }
    }
    case 'ADD_NEW_PLACE_FORM_CLOSE': {
      return {
        ...state,
        listOfPlacesOpened: true,
        newPlaceFormOpened: false,
        newPlaceMarkerCoord: {long: null, lat: null}
      }
    }
    case 'ADD_GROCERY_STORE_FULFILLED': {
      return {
        ...state,
        listOfPlacesOpened: true,
        newPlaceFormOpened: false,
        newPlaceMarkerCoord: {long: null, lat: null}
      }
    }
    case 'ADDING_NEW_MARKER_OF_PLACE': {
      return {
        ...state,
        placingNewMarker: true
      }
    }
    case 'NEW_MARKER_OF_PLACE_ADDED': {
      return{
        ...state,
        placingNewMarker: false,
        newPlaceMarkerCoord: {long: action.payload.lng(), lat: action.payload.lat()}
      }
    }
    case 'EXPAND_SIDE_PANEL': {
      if (!(state.sidePanelState === 2)) {
        if (state.newPlaceFormOpened) {
          return {
            ...state,
            sidePanelState: state.sidePanelState + 2
          }
        } else {
          return {
            ...state,
            sidePanelState: state.sidePanelState + 1
          }
        }
      } else {
        return state;
      }
    }
    case 'SQUEEZE_SIDE_PANEL': {
      if (!(state.sidePanelState === 0)) {
        if (state.newPlaceFormOpened) {
          return {
            ...state,
            sidePanelState: state.sidePanelState - 2
          }
        } else {
          return {
            ...state,
            sidePanelState: state.sidePanelState - 1
          }
        }
      } else {
        return state;
      }
    }
  }
  return state;
}