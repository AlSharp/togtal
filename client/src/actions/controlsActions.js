export function passGoogleMapToRedux(props) {
  return function(dispatch) {
    dispatch({type: 'PASS_MAP_OBJECT_TO_REDUX_STORE', payload: props});
  }
}

export function handleFirstGMapLoad() {
  return function(dispatch) {
    dispatch({type: 'FIRST_LOAD_OF_GOOGLE_MAP'});
  }
}

export function handleGoogleMapViewportWidthChange(props) {
  return function(dispatch) {
    dispatch({type: 'GOOGLE_MAP_VIEWPORT_WIDTH_CHANGE', payload: props});
  }
}

export function handlePlacingNewMarker() {
  return function(dispatch) {
    dispatch({type: 'ADDING_NEW_MARKER_OF_PLACE'});
  }
}

export function handleNewMarkerOfPlaceAdded(props) {
  return function(dispatch) {
    dispatch({type: 'NEW_MARKER_OF_PLACE_ADDED', payload: props});
  }
}

export function handleLeftAngleClick() {
  return function(dispatch) {
    dispatch({type: 'EXPAND_SIDE_PANEL'});
  }
}

export function handleRightAngleClick() {
  return function(dispatch) {
    dispatch({type: 'SQUEEZE_SIDE_PANEL'});
  }
}

export function handleAddNewPlaceBtnClick() {
  return function(dispatch) {
    dispatch({type: 'ADD_NEW_PLACE_BUTTON_CLICK'})
  }
}

export function handleCloseNewPlaceForm() {
  return function(dispatch) {
    dispatch({type: 'ADD_NEW_PLACE_FORM_CLOSE'})
  }
}