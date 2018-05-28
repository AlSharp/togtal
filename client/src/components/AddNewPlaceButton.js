import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { handleAddNewPlaceBtnClick } from '../actions/controlsActions';

class AddNewPlaceButton extends Component {
  render() {
    return(
      <div className="new-place-button">
        <Button onClick={this.props.handleAddNewPlaceBtnClick}>
          <i className="material-icons">add_location</i>
        </Button>
      </div>
    )
  }
}

export default connect(null, {
  handleAddNewPlaceBtnClick: handleAddNewPlaceBtnClick
})(AddNewPlaceButton);