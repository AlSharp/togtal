import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { handleLeftAngleClick, handleRightAngleClick } from '../actions/controlsActions';

class LessMoreRightContainerButton extends Component {

  render() {
    const {
      handleLeftAngleClick,
      handleRightAngleClick,
      sidePanelState 
    } = this.props;
    return(
      <div className="less-more-right-container-button">
        <Button onClick={ sidePanelState !== 2 ? handleLeftAngleClick : null }>
          <i className="material-icons md-34">chevron_left</i>
        </Button>
        <Button onClick={ sidePanelState !== 0 ? handleRightAngleClick : null }>  
          <i className="material-icons md-34">chevron_right</i>
        </Button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sidePanelState: state.controls.sidePanelState,
  };
}

export default connect(mapStateToProps, {
  handleLeftAngleClick: handleLeftAngleClick,
  handleRightAngleClick: handleRightAngleClick
})(LessMoreRightContainerButton);