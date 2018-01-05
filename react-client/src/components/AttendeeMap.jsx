import React from 'react';
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
var textColorBackground = ['floralwhite','lightblue', 'lavender', 'powderblue', 'peachpuff', 'palegreen', 'wheat'];


const AttendeeMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA3wPEP1-hGvDC0_cmmKv3JRYiKIJukCCU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` , width: `700px`}} />,
    mapElement: <div style={{ height: `100%` }} />,
    options : {suppressMarkers: true}
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();
      this.props.users.forEach((user, i) => {
        console.log(user.latitude, user.longitude, user);
        DirectionsService.route({
          origin: new google.maps.LatLng(user.latitude, user.longitude),
          destination: new google.maps.LatLng(this.props.eventCoordinate.lat, this.props.eventCoordinate.lng),
          travelMode: google.maps.TravelMode.TRANSIT,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.props.directions.push(result);
            this.setState({directions : this.props.directions});
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      });
    }
  })
)(props =>
  <GoogleMap defaultZoom={6} defaultCenter={new google.maps.LatLng(40.7128, -74.0060)}>

  {props.directions.length === props.users.length ?
    props.users.map((user, j) => (
      <MarkerWithLabel 
        position={{lat: user.latitude, lng: user.longitude}}
        labelAnchor={new google.maps.Point(-10, -10)}
        labelStyle={{background: textColorBackground[j], fontSize: "15px", padding: "4px", borderRadius: "15%",border: "1px solid black"}}
        user={user}
        key={j}
      >
        <div>
          <div>{user.firstName} {user.lastName.charAt(0)+'.'}</div>
        </div>
      </MarkerWithLabel>)) : ''}

    {(props.directions.length === props.users.length) ? 
      (props.directions.map((direction, i) => (
        <DirectionsRenderer directions={direction} key={i}/>
        )
      )) : ''}
  </GoogleMap>
);


export default AttendeeMap;
