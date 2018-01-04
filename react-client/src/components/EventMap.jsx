import React from 'react';
import axios from 'axios';
import AttendeeMap from './AttendeeMap.jsx';
import AddAttendee from './AddAttendee.jsx';

class EventMap extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      eventLocation: {
        lat:40.7505, 
        lng:-73.9764
      },
      users: [
        {firstName: 'asddasfa', lastName: 'alkdk', location: {lat:40.7413, lng:-73.9883}}, 
        {firstName: 'asddasfa', lastName: 'alkdk', location: {lat:40.7268, lng:-74.0353}}, 
        {firstName: 'asddasfa', lastName: 'alkdk', location: {lat:40.6872, lng:-73.9418}}
      ],
      userLocation: {
        lat: '',
        lng: ''
      },
      userId: this.getUserId(),
      eventId: this.getEventId()
    }

    this.handleNewAttendee = this.handleNewAttendee.bind(this);
    this.getServerData = this.getServerData.bind(this)
    this.getUserLocation();
  }
  
  componentDidMount () {
    this.getServerData();
    setInterval(this.getServerData, 1000 * 30);
  }

  handleNewAttendee (attendee) {
    axios.post('/user', {
      attendee: attendee,
      eventId: this.state.eventId
    })
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
  }

  getEventId () {
    return this.props.match.params.number;
  }

  getServerData () {
    axios.get('/event', this.state.eventId)
    .then((response) => console.log('Server response from /GET to /event', response))
    .catch((error) => console.error(error));
  }

  sendUserLocation () {
    console.log('Sending to server:', {
      userId: this.state.userId,
      lat: this.state.userLocation.lat,
      lng: this.state.userLocation.lng
    });

    axios.put('/user', {
      userId: this.state.userId,
      lat: this.state.userLocation.lat,
      lng: this.state.userLocation.lng
    })
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
  }

  getUserId () {
    return this.props.location.search.replace('?userId=', '');
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

  pluckUserLocations () {
    return this.state.users.map((user) => user.location);
  }

  render () {
    return (
      <div>
        <h4> Event Map </h4>
        <p> Event ID: {this.state.eventId} </p>
        <p> User ID: {this.state.userId} </p>
        <p> Current location: {this.state.userLocation.lat + ',' + this.state.userLocation.lng} </p>
        <AttendeeMap userCoordinates={this.pluckUserLocations()} eventCoordinate={this.state.eventLocation} directions={[]}/>
        <AddAttendee addNewAttendee={this.handleNewAttendee} />
      </div>
    );
  }
}

export default EventMap;