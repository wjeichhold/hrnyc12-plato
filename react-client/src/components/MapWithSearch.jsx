import React from 'react';
const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const { withScriptjs, withGoogleMap, GoogleMap, Marker} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const MapWithASearchBox = compose(
    withProps({
      googleMapURL: 'AIzaSyCvRu9kUwcu843lpGoD2QZfJo3f7zbZR7U',
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),

    lifecycle({
      componentWillMount() {
        const refs = {}

        this.setState({
          bounds: null,
          center: {
            lat: 40.7505, lng: -73.9764
          },
          markers: [],
          onMapMounted: ref => {
            refs.map = ref;
          },
          onBoundsChanged: () => {
            this.setState({
              bounds: refs.map.getBounds(),
              center: refs.map.getCenter(),
            })
          },
          onSearchBoxMounted: ref => {
            refs.searchBox = ref;
          },
          onPlacesChanged: () => {
            const places = refs.searchBox.getPlaces();
            const bounds = new google.maps.LatLngBounds();

            places.forEach(place => {
              if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport)
              } else {
                bounds.extend(place.geometry.location)
              }
            });
            const nextMarkers = places.map(place => ({
              position: place.geometry.location,
            }));
            const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
            this.props.getEventCoordinate({'lat': refs.map.getCenter().lat(),'lng': refs.map.getCenter().lng()})
            this.setState({
              center: nextCenter,
              markers: nextMarkers,
            }, () => {
              console.log(this.state);
              this.props.getEventCoordinate({'lat': this.state.center.lat(),'lng': this.state.center.lng()})
              this.props.setLocale(refs.searchBox.state.__SECRET_SEARCH_BOX_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.gm_accessors_.places.Jc.formattedPrediction)
            });
            // refs.map.fitBounds(bounds);
          },
        })
      },
    }),
    withScriptjs,
    withGoogleMap
  )(props =>
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={13}
      center={props.center}
      onBoundsChanged={props.onBoundsChanged}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Enter a location"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </SearchBox>
      {props.markers.map((marker, index) => {
        return <Marker key={index} position={marker.position} />
        }
      )}
    </GoogleMap>
  );


  export default MapWithASearchBox;
