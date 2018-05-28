import React, { Component } from "react";
import { Fields, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';

import validate from './validate';

const CoordinatesInput = (fields) =>
  <div>
    <div>
      <button type="button" className="btn btn-primary" onClick={fields.handleButtonClick}>
        Add location
      </button>
    </div>
    <input
      id={fields.id[0]}
      type={fields.type}
      value={fields.location.long.input.value}
      onChange={value => fields.location.long.input.onChange(value)}
    />
    <input
      id={fields.id[1]}
      type={fields.type}
      value={fields.location.lat.input.value}
      onChange={value => fields.location.lat.input.onChange(value)}
    />
    <div className="fv-error-addnewplace">
      {
        <span>
          {
            fields.location.long.meta.touched && fields.location.long.meta.error && fields.location.long.meta.error
          }
        </span>
      }
    </div>
  </div>

const isEquivalent = (a, b) => {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];

    if(a[propName] !== b[propName]) {
      return false;
    }
  }

  return true;
}
   

class StepThird extends Component {
  componentWillReceiveProps(nextProps) {
    if(!isEquivalent(nextProps.newPlaceMarkerCoord, this.props.newPlaceMarkerCoord)) {
      this.props.dispatch(change('addNewPlaceForm', 'location.long', nextProps.newPlaceMarkerCoord.long));
      this.props.dispatch(change('addNewPlaceForm', 'location.lat', nextProps.newPlaceMarkerCoord.lat));
    }
  }
  render() {
    const { number, title, onAddMarker, handleSubmit, prevStep, newPlaceMarkerCoord } = this.props;
    console.log('coordinates', newPlaceMarkerCoord);
    return(
      <div className="step">
        <div className="step-header">
          <div className="step-header-number">
            { number <= 3 ? 3 : <i className="material-icons md-18">done</i> }
          </div>
          <span className="step-header-title">
            {title}
          </span>
        </div>
        <div className="step-body">
          { number === 3 ?
            <div className="step-body-content">
              <div>
                <p>Click the button below. Naviagate to the map and choose the location</p>
              </div>
              <form onSubmit={handleSubmit}>
                <Fields
                  id={['new-place-coord-long', 'new-place-coord-lat']}
                  type="hidden"
                  names={['location.long', 'location.lat']}
                  component={CoordinatesInput}
                  handleButtonClick={onAddMarker}
                />
                <div className="step-body-btn-nav">
                  <button type="button" className="btn btn-danger" onClick={ prevStep }>
                    Back
                  </button>
                  <button type="submit" className="btn btn-success">
                    Next
                  </button>
                </div>
              </form>
            </div> :
            null
          }
          <div className="step-body-footer">
          </div>
        </div>
      </div>     
    )
  }
}

function mapStatetoProps(state) {
  return {
    newPlaceMarkerCoord: state.controls.newPlaceMarkerCoord
  }
}

export default reduxForm({
  form: 'addNewPlaceForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(connect(mapStatetoProps)(StepThird));