import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; 
import Places from './places';
import Controls from './controls';

const allReducers = combineReducers({
  places: Places,
  controls: Controls,
  form: formReducer.plugin({
    addNewPlaceForm: (state, action) => {
      switch(action.type) {
        case 'CLOSING_MODAL': {
          return undefined; // <--- blow away form data
        }
        default: {
          return state;
        }
      }
    }
  })
});

export default allReducers;