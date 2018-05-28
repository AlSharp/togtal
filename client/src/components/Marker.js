/*global google*/

import { Component } from 'react';

class Marker extends Component {
  componentDidMount() {
    this.renderMarker();
  }
  
  renderMarker() {
    var { place, remove, map } = this.props;
    if (!remove) {
      console.log('added: ', place.title);
      place.setMap(map);
    } else {
      console.log('removed: ', place.title);
      place.setMap(null);
      place = null;
    }
  }
  
  render() {
    return null;
  }
}
  
export default Marker;