import React, { Component } from 'react';
import { connect } from 'react-redux';

import Place from './Place';

class ListOfPlaces extends Component {
  render() {
    const { places } = this.props;
    return (
      <div className="list-of-places">
        {places.map((place) => {
          return(<Place place={place} key={place._id} />);
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.places.places
  };
}

export default connect(mapStateToProps)(ListOfPlaces);