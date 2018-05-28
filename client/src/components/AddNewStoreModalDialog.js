import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Modal, Button, Col, Form, ControlLabel, FormControl, FormGroup, } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { addNewPlaceButtonSwitchState } from '../actions/controlsActions';
import { closeModal } from '../actions/controlsActions';
import { addGroceryStore } from '../actions/placesActions';

const ReduxFormControl = ({input, meta, ...props}) => {
  return <FormControl {...props} {...input} />
};

class AddNewStoreModalDialog extends Component {
  
  addNewPlaceButtonSwitchState() {
    this.props.dispatch(addNewPlaceButtonSwitchState());
  }
  
  setPositionOfModal() {
    var leftcontainer = document.getElementsByClassName('left-container');
    var modal = document.getElementsByClassName('add-new-place-modal');
    var leftcontainerstyle = window.getComputedStyle(leftcontainer[0]);
    var modalstyle = window.getComputedStyle(modal[0]);
    modal[0].style.left = parseInt(leftcontainerstyle.getPropertyValue('width'), 10)/2
                        - parseInt(modalstyle.getPropertyValue('width'), 10)/2 +'px';
  }
  
  closeModal() {
    this.props.dispatch(closeModal());
  }
  
  onSubmit(props) {
    var markerdata = {
      name: props.name,
      location: this.props.controls.newPlaceMarkerCoord
    };
    this.props.dispatch(addGroceryStore(markerdata));
    this.props.dispatch(closeModal());
  }
  
  render() {
    const { places, controls, handleSubmit } = this.props;
    return(
      <div className="add-new-store-button">
        <Button bsStyle="primary" onClick={this.addNewPlaceButtonSwitchState.bind(this)}>
          + New Place
        </Button>
        <Modal
          show={controls.addNewPlaceModalOpened}
          onHide={this.closeModal.bind(this)}
          onEnter={this.setPositionOfModal.bind(this)}
          dialogClassName="add-new-place-modal"
        >
          <Form 
            horizontal
            onSubmit = {handleSubmit(this.onSubmit.bind(this))}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add new place</Modal.Title>
            </Modal.Header>
      
            <Modal.Body>
              <FormGroup controlId="name">
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={10}>
                  <Field name="name" component={ReduxFormControl} type="text" placeholder="Place" />
                </Col>
              </FormGroup>
            </Modal.Body>
      
            <Modal.Footer>
              <Button onClick={this.closeModal.bind(this)}>Close</Button>
              <Button type="submit" bsStyle="primary">Add</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    controls: state.controls
  };
}

export default reduxForm({form: 'formAddNewPlace'})(connect(mapStateToProps)(AddNewStoreModalDialog));