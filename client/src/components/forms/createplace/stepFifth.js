import React, { Component } from "react";
import { reduxForm } from 'redux-form';

import validate from './validate';

class StepFifth extends Component {
  render() {
    const { number, title, handleSubmit, prevStep, pristine, submitting } = this.props;
    return(
      <div className="step">
        <div className="step-header">
          <div className="step-header-number">
            { number <= 5 ? 5 : <i className="material-icons md-18">done</i> }
          </div>
          <span className="step-header-title">
            {title}
          </span>
        </div>
        <div className="step-body">
          { number === 5 ?
            <div className="step-body-content no-border-left">
              <form onSubmit={handleSubmit}>
                <div className="step-body-btn-nav">
                  <button type="button" className="btn btn-danger" onClick={ prevStep }>
                    Back
                  </button>
                  <button type="submit" className="btn btn-success" disabled={pristine || submitting}>
                    Submit
                  </button>
                </div>
              </form>
            </div> :
            null
          }
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
})(StepFifth);