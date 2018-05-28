import React, { Component } from 'react';

import GoogleMap from './GoogleMap';

class LeftContainer extends Component {
  render() {
    console.log('<<<<<<<<<<LEFT CONTAINER RENDERING>>>>>>>>>>>>>')
    return (
      <div className="left-container"> 
        <GoogleMap />
      </div>
    );
  }
}

export default LeftContainer;