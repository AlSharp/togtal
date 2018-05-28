/*global google*/

import React, { Component } from 'react';
import  { BarLoader } from 'react-spinners';
import { connect } from 'react-redux';

import { handleNewMarkerOfPlaceAdded, handleFirstGMapLoad, passGoogleMapToRedux } from '../actions/controlsActions';
import { fetchPlacesByViewport } from '../actions/placesActions';

import Marker from './Marker';

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      centermap: {
        lat: 46.31555,
        lng: 44.25878
      },
      zoom: 7,
      arrayOfPlaces: [],
      placesToAdd: [],
      placesToRemove: [],
    };
  }

  handleNewMarkerOfPlaceAdded(props) {
    this.props.handleNewMarkerOfPlaceAdded(props);
  }
  
  fetchPlacesByViewport(props) {
    this.props.fetchPlacesByViewport(props);
  }

  passGoogleMapToRedux(props) {
    this.props.passGoogleMapToRedux(props);
  }
  
  filterOneFromAnother(arr1, arr2) {
    return arr1.filter(function(o1) {
             return !arr2.some(function(o2) {
               const id_1 = o1.id || o1._id;
               const id_2 = o2.id || o2._id;
               return id_1 === id_2;
             });
           });
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('************ GOOGLE MAP RECIEVING NEW PROPS ************');
    const { placesFetched, places } = this.props;
    console.log(`.........Map Viewport Width = ${nextProps.googleMapViewportWidth}`);
    console.log(placesFetched + ", " + nextProps.placesFetched);
    if (nextProps.placesFetched) {
      //nextProps.placesFetched && nextProps.placesFetched !== placesFetched
      var currentPlaces = places;
      var nextPlaces = nextProps.places;
      
      var prevPlacesToAdd = this.state.placesToAdd;
      var prevPlacesToRemove = this.state.placesToRemove;
      
      console.log('prevPlacesToAdd: ', prevPlacesToAdd);
      console.log('prevPlacesToRemove: ', prevPlacesToRemove);
      
      console.log('currentplaces: ', currentPlaces);
      console.log('nextPlaces: ', nextPlaces);
      
      var arrayOfPlaces = this.state.arrayOfPlaces;
      var nextPlacesToAdd = [];
      var nextPlacesToRemove = [];
      console.log('ARRAY OF PLACES: ', arrayOfPlaces);

      const markerIcon = {
        path: "M3,0 h32 a3,3 0 0 1 3,3 v12 a3,3 0 0 1 -3,3 h-13 l-3,4 l-3,-4 h-13 a3,3 0 0 1 -3,-3 v-12 a3,3 0 0 1 3,-3 z",
        fillColor: '#2E7E36',
        strokeColor: '#fff',
        strokeWeight: 2,
        fillOpacity: 1,
        anchor: new google.maps.Point(19, 22),
        scale: 1,
        labelOrigin: new google.maps.Point(19, 10)
      }
      
      this.filterOneFromAnother(nextPlaces, currentPlaces).forEach((place) => {
        var position = new google.maps.LatLng(place.loc[1], place.loc[0]);
        var marker = new google.maps.Marker({
          position: position,
          title: place.name,
          key: place._id,
          id: place._id,
          icon: markerIcon,
          label: {
            text: place.products[0].price_histories[0].price.toString(),
            color: '#fff',
            fontFamily: 'RobotoMono',
            fontSize: '12px',
            fontWeight: '500'
          }
        });
        nextPlacesToAdd.push(marker);
        console.log('to add: ', marker.title);
      });
      
      this.filterOneFromAnother(arrayOfPlaces, nextPlaces).forEach((marker) => {
        nextPlacesToRemove.push(marker);
        console.log('to remove: ', marker.title);
      });
      
      this.setState(
        {
          placesToAdd: nextPlacesToAdd,
          placesToRemove: nextPlacesToRemove,
          arrayOfPlaces: this.filterOneFromAnother(arrayOfPlaces.concat(nextPlacesToAdd), nextPlacesToRemove),
        }
      );
    }
    console.log('********* GOOGLE MAP REVIEVING PROPS FINISHED *************');
  }
  
  componentDidMount() {
    console.log('******** GOOGLE MAP MOUNTING **********');
    
    // get access to GoogleMap
    
    var gmap = this;
    
    // map style
    
    var togtalStyle = [
      {
        featureType: 'poi.business',
        elementType: 'labels',
        stylers: [
          {
            'visibility': 'off'
          }
        ]
      }
    ];
    
    // render googlemap
    
    var map = new google.maps.Map(this.refs.map, {
      center: { lat: this.state.centermap.lat, lng: this.state.centermap.lng },
      zoom: this.state.zoom,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: togtalStyle,
    });

    console.log('~~~~~~~~~~MAP IS GOING TO REDUX~~~~~~~~~~~~~');
    console.log('-> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> -> ->');
    this.passGoogleMapToRedux(map);
    console.log('~~~~~~~~~~MAP IS GOING TO REDUX~~~~~~~~~~~~~');

    map.addListener('tilesloaded', () => {
      console.log('.........TILES LOADED.......');
      if (gmap.props.googleMapFirstLoad) {
        setTimeout(() => gmap.props.handleFirstGMapLoad(), 1000);
      }
    });
    
    // add click event listener to the map
    
    map.addListener('click', function(e) {
      console.log(e.latLng.lng() + ', ' + e.latLng.lat());
      if (gmap.props.placingNewMarker) {
        gmap.handleNewMarkerOfPlaceAdded(e.latLng);
      }
    });
    
    // viewport listener
    
    map.addListener('idle', function(){
      let { googleMapViewportWidth, sidePanelState } = gmap.props;
      console.log('====IDLE====');
      var bounds = map.getBounds();
      var viewport = {
        north: bounds.getNorthEast().lat(),
        south: bounds.getSouthWest().lat(),
        east: bounds.getNorthEast().lng(),
        west: bounds.getSouthWest().lng()
      };

      console.log(viewport);

      console.log('========================Getting Polygon============================')
      var viewportWidthLatLng = Math.abs(viewport.west - viewport.east);
      var offset = null;
      if (sidePanelState === 0) {
        offset = 0;
      } else if (sidePanelState === 1) {
        offset = 355;
      } else {
        offset = 683;
      }
      var scale = viewportWidthLatLng/(googleMapViewportWidth + offset);
      console.log(`width in lng coordinates: ${viewportWidthLatLng}`);
      console.log(`width in pixels: ${googleMapViewportWidth}`);
      console.log(`scale (degrees/px: ${scale}`);
      console.log('===================================================================')

      var padding = 15; //pixels
      var paddingInDegrees = padding * scale;

      var polygon = {};

      polygon.south = viewport.south + paddingInDegrees;
      polygon.west = viewport.west + paddingInDegrees;
      polygon.north = viewport.north - paddingInDegrees;
      polygon.east = viewport.west + googleMapViewportWidth * scale - paddingInDegrees;

      console.log(polygon);

      gmap.fetchPlacesByViewport(polygon);
    });

    setInterval(() => console.log('SIDE PANEL STATE = ', this.props.sidePanelState), 5000);
  }

  componentDidUpdate (prevProps) {
    if (prevProps.googleMapFirstLoad) {
      setTimeout(() => this.moveLabels(this.props), 1500);
    } else {
      let delta = this.props.sidePanelState - prevProps.sidePanelState;
      if (delta > 0) {
        console.log('================ TRIGGER IDLE EVENT ====================');
        setTimeout(() => this.moveLabels(this.props), 400);
        setTimeout(() => google.maps.event.trigger(this.props.map, 'idle'), 600);
      } else if (delta < 0) {
        console.log('================ TRIGGER IDLE EVENT ====================');
        setTimeout(() => this.moveLabels(this.props), 200);
        setTimeout(() => google.maps.event.trigger(this.props.map, 'idle'), 600);
      }
    }
  }

  moveLabels(props) {
    switch(props.sidePanelState) {
      case 0:
        document.querySelector('.gm-style > div:nth-child(7)').style.right = '0px';
        document.querySelector('.gm-style > div:nth-child(5)').style.right = '71px';
        break;
      case 2:
        document.querySelector('.gm-style > div:nth-child(7)').style.right = '681px';
        document.querySelector('.gm-style > div:nth-child(5)').style.right = '752px';
        break;
      default:
        document.querySelector('.gm-style > div:nth-child(7)').style.right = '353px';
        document.querySelector('.gm-style > div:nth-child(5)').style.right = '424px';
    }
  }
  
  render() {
    const { placesToAdd, placesToRemove } = this.state;
    const { placesFetched, placesFetching, map } = this.props;
    console.log('************ GOOGLE MAP RENDERING *****************');
    console.log(`RENDER ==== Places to add: ${placesToAdd}`);
    console.log(`RENDER ==== Places to remove: ${placesToRemove}`);
    console.log('***************************************************');
    if (placesFetching && !placesFetched) {
      console.log('fetching.......');
      return (
        <div id="map" ref="map">
          <BarLoader
            color={'#4A90E2'}
            loading={placesFetching}
            width={200}
            height={6}
          />
        </div>
      );
    } else if (!placesFetching && placesFetched) {
      console.log('fetched!!!');
      return (
        <div id="map" ref="map">
          {placesToAdd.map((place) => {
            console.log('adding: ', place.title);
            return(<Marker place={place} key={place.key} remove={false} map={map} />);
          })}
          {placesToRemove.map((place) => {
          console.log('removing: ', place.title);
            return(<Marker place={place} key={place.id} remove={true} map={map} />);
          })}
        </div>
      );
    } else {
      console.log('initial load');
      return (
        <div id="map" ref="map" />
      )
    } 
  }
}

function mapStateToProps(state) {
  return {
    places: state.places.places,
    placesFetched: state.places.fetched,
    placesFetching: state.places.fetching,
    googleMapFirstLoad: state.controls.googleMapFirstLoad,
    googleMapViewportWidth: state.controls.googleMapViewportWidth,
    placingNewMarker: state.controls.placingNewMarker,
    sidePanelState: state.controls.sidePanelState,
    map: state.controls.map
  };
}

export default connect(mapStateToProps, {
  passGoogleMapToRedux: passGoogleMapToRedux,
  handleFirstGMapLoad: handleFirstGMapLoad,
  handleNewMarkerOfPlaceAdded: handleNewMarkerOfPlaceAdded,
  fetchPlacesByViewport: fetchPlacesByViewport
})(GoogleMap);

