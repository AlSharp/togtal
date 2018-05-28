import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import validate from './validate';

const FieldGroup = ({ id, label, type, placeholder, input: { value, onChange }, meta: { touched, error } }) => 
  <div>
    <FormGroup controlId={id} validationState={touched && error ? error : null}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={value => onChange(value)}
      />
    </FormGroup>
  </div>

class StepSecond extends Component {
  render() {
    const { number, title, handleSubmit, prevStep } = this.props;
    return(
      <div className="step">
        <div className="step-header">
          <div className="step-header-number">
            { number <= 2 ? 2 : <i className="material-icons md-18">done</i> }
          </div>
          <span className="step-header-title">
            {title}
          </span>
        </div>
        <div className="step-body">
          { number === 2 ?
            <div className="step-body-content">
              <form onSubmit={handleSubmit}>
                <Field
                  id="placeNameId"
                  label="Please enter the name of place"
                  type="text"
                  placeholder="Examples: Walmart, Sunoco, Aldi"
                  name="name"
                  component={FieldGroup}
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

export default reduxForm({
  form: 'addNewPlaceForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(StepSecond);