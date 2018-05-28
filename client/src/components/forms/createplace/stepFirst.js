import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import validate from './validate';

const ButtonMenu = ({ input: { value, onChange }, meta: { touched, error } }) => 
  <div>
    <ButtonToolbar>
      <ToggleButtonGroup
        type="radio"
        name="category"
        onChange={(value) => onChange(value)}
      >
        <ToggleButton 
          bsStyle={value ==="Grocery store" ? 'success' : 'default'}
          value="Grocery store"
        >
        Grocery store
        </ToggleButton>
        <ToggleButton 
          bsStyle={value ==="Gas station" ? 'success' : 'default'}
          value="Gas station"
        >
        Gas station
        </ToggleButton>
        <ToggleButton 
          bsStyle={value ==="Barber shop" ? 'success' : 'default'}
          value="Barber shop"
        >
        Barber shop
        </ToggleButton>
      </ToggleButtonGroup>
    </ButtonToolbar>
    <div className="fv-error-addnewplace">
      {
        <span>{touched && error && error}</span>
      }
    </div>
  </div>

class StepFirst extends Component {
  render() {
    const { number, title, handleSubmit } = this.props;
    return(
      <div className="step">
        <div className="step-header">
          <div className="step-header-number">
            { number === 1 ? 1 : <i className="material-icons md-18">done</i> }
          </div>
          <span className="step-header-title">
            {title}
          </span>
        </div>
        <div className="step-body">
          { number === 1 ?
            <div className="step-body-content">
              <form onSubmit={handleSubmit}>
                <Field
                  name="category"
                  component={ButtonMenu}
                />
                <div className="step-body-btn-nav">
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

export default reduxForm({
  form: 'addNewPlaceForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(StepFirst);