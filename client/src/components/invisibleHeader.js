import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import ReactResizeDetector from 'react-resize-detector';

import { handleGoogleMapViewportWidthChange } from '../actions/controlsActions';

class InvisibleHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moving: '',
    }
  }

  onResize(width) {
    console.log(width);
    this.props.handleGoogleMapViewportWidthChange(width);
  }

  componentWillReceiveProps(nextProps) {
    console.log('<<<<<<<<<<< invisibleHEADER NEW PROPS >>>>>>>>>>');
    if (nextProps.sidePanelState !== this.props.sidePanelState) {
      this.setState({
        moving: this.props.sidePanelState.toString() + nextProps.sidePanelState.toString()
      });
    }
  }

  getContainerClassName() {
    const { moving } = this.state;
    return classNames(
      'invisible-header',
      {
        'squeezeBack': (moving === '01'),
        'squeezeTo': (moving === '12'),
        'expandBack': (moving === '21'),
        'expandTo': (moving === '10'),
        'doubleSqueeze': (moving === '02'),
        'doubleExpand': (moving === '20')
      }
    );
  }
  
  render() {
    const containerClassName = this.getContainerClassName();
    console.log('///////////RENDER INVISIBLe HEADER///////////////');
    return (
      <div className={ containerClassName }>
        <ReactResizeDetector
          handleWidth
          onResize={this.onResize.bind(this)}
          refreshMode = 'debounce'
          refreshRate = {50}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sidePanelState: state.controls.sidePanelState
  };
}

export default connect(mapStateToProps, {
  handleGoogleMapViewportWidthChange: handleGoogleMapViewportWidthChange
})(InvisibleHeader);