import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import ButtonPanel from './ButtonPanel';
import ListOfPlaces from './ListOfPlaces';
import NewPlaceForm from './forms/createplace/newPlaceForm';

class RightContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moving: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sidePanelState !== this.props.sidePanelState) {
      this.setState({ moving: this.props.sidePanelState.toString() + nextProps.sidePanelState.toString() });
      console.log(`moving: ${this.props.sidePanelState.toString() + nextProps.sidePanelState.toString()}`);
    }
  }

  getContainerClassName() {
    const { moving } = this.state;
    return classNames(
      'right-container',
      {
        'slideIn': (moving === '01'),
        'expand': (moving === '12'),
        'squeeze': (moving === '21'),
        'slideOut': (moving === '10'),
        'slideInAndExpand': (moving === '02'),
        'squeezeAndSlideOut': (moving === '20')
      }
    );
  }
  
  render() {
    const { listOfPlacesOpened, newPlaceFormOpened } = this.props;
    const containerClassName = this.getContainerClassName();
    return (
      <div className={ containerClassName }>
        <ButtonPanel />
        {
          listOfPlacesOpened ? <ListOfPlaces /> : null
        }
        {
          newPlaceFormOpened ? <NewPlaceForm /> : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    listOfPlacesOpened: state.controls.listOfPlacesOpened,
    sidePanelState: state.controls.sidePanelState,
    newPlaceFormOpened: state.controls.newPlaceFormOpened
  };
}

export default connect(mapStateToProps)(RightContainer);