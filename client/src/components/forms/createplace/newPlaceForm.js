import React, { Component } from "react";
import { connect } from 'react-redux';

import { handleCloseNewPlaceForm, handlePlacingNewMarker } from '../../../actions/controlsActions';
import { handleAddNewPlace } from '../../../actions/placesActions';

import StepFirst from './stepFirst';
import StepSecond from './stepSecond';
import StepThird from './stepThird';
import StepFourth from './stepFourth';
import StepFifth from "./stepFifth";
import './newPlaceForm.css';


const FormHeader = (props) => 
  <div className="new-place-stepper-form-header">
    <span>{props.title}</span>
    <i
      className="material-icons"
      onClick={props.onClose}
    >
      close
    </i>
  </div>

const FormBody = (props) => <div className="new-place-stepper-form-body">{props.children}</div>

class NewPlaceForm extends Component {
  constructor(props) {
    super(props);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.state = {
      step: 1
    }
  }

  onSubmit(props) {
    this.props.handleAddNewPlace(props);
  }

  nextStep() {
    this.setState({ step: this.state.step + 1 });
  }

  prevStep() {
    this.setState({ step: this.state.step - 1 });
  }

  render() {
    const { handleCloseNewPlaceForm, handlePlacingNewMarker } = this.props;
    return(
      <div className="new-place-stepper-form">
        <FormHeader title="Add new place" onClose={handleCloseNewPlaceForm}/>
        <FormBody>
          <StepFirst
            number={this.state.step}
            title="Select the category of place"
            onSubmit={this.nextStep.bind(this)}
          />
          <StepSecond
            number={this.state.step}
            title="Enter the name of place"
            prevStep={this.prevStep.bind(this)}
            onSubmit={this.nextStep.bind(this)}
          />
          <StepThird
            number={this.state.step}
            title="Add location on the map"
            onAddMarker={handlePlacingNewMarker}
            prevStep={this.prevStep.bind(this)}
            onSubmit={this.nextStep.bind(this)}
          />
          <StepFourth
            number={this.state.step}
            title="Add prices"
            prevStep={this.prevStep.bind(this)}
            onSubmit={this.nextStep.bind(this)}
          />
          <StepFifth
            number={this.state.step}
            title="Submit"
            prevStep={this.prevStep.bind(this)}
            onSubmit={this.onSubmit.bind(this)}
          />
        </FormBody>
      </div>
    )
  }
}

export default connect(null,
  {
    handleCloseNewPlaceForm: handleCloseNewPlaceForm,
    handlePlacingNewMarker: handlePlacingNewMarker,
    handleAddNewPlace: handleAddNewPlace
  }
)(NewPlaceForm);