import React, { Component } from 'react';

import AddNewPlaceButton from './AddNewPlaceButton';
import LessMoreRightContainerButton from './LessMoreRightContainerButton';

class ButtonPanel extends Component {
  render() {
    return(
      <div className="button-panel">
        <AddNewPlaceButton />
        <LessMoreRightContainerButton />
      </div>
    )
  }
}

export default ButtonPanel;