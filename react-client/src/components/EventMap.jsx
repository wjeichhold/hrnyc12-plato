import React from 'react';
import axios from 'axios';
import { URLSearchParams } from 'url';

class EventMap extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      eventLocation: {
        lat: null,
        lng: null
      },
      users: [],
      userLocation: {
        lat: '',
        lng: ''
      },
      userId: ''
    }
  }
  
  componentDidMount () {
    this.getUserId();
    this.getUserLocation();
  }

  sendUserLocation () {
    console.log('Sending to server:', {
      userId: this.state.userId,
      lat: this.state.userLocation.lat,
      lng: this.state.userLocation.lng
    });

    axios.put('/users', {
      userId: this.state.userId,
      lat: this.state.userLocation.lat,
      lng: this.state.userLocation.lng
    })
    .then((response) => console.log(response));
  }

  getUserId () {
    this.setState({
      userId: this.props.location.search.replace('?userId=', '')
    });
  }

  getUserLocation () {
    const geoSuccess = (position) => {
      this.setState({
        userLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }, this.sendUserLocation);
    }

    const geoError = (error) => {
      console.error('Error getting location:', error.message);
    }

    navigator.geolocation.watchPosition(geoSuccess, geoError);
  }
  render () {
    return (
      <div>
        <h4> Event Map </h4>
        <p> Event ID: {this.props.match.params.number} </p>
        <p> Current location: {this.state.userLocation.lat + ',' + this.state.userLocation.lng} </p>
        <p> TODO add dynamic map </p>
      </div>
    );
  }
}

export default EventMap;