import React from 'react';
import axios from 'axios';

class CreateEvent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      eventName: '',
      location: {
        longitude: '',
        latitude: '',
      },
      time: '',
      attendees: []
    }
    this.handleEventNameChange = this.handleEventNameChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleEventNameChange (e) {
    this.setState({
      eventName: e.target.value
    });
  }

  handleTimeChange (e) {
    this.setState({
      time: e.target.value
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    console.log('Submitting, contents of state:', this.state);
    axios.post('/event', this.state).then((response) => console.log(response));
  }

  render () {
    return (
      <div>
        <h4> Event Details </h4>
        <form onSubmit={this.handleSubmit}>
          <label>
            Event Name:
            <input type="text" value={this.state.eventName} onChange={this.handleEventNameChange} required/>
          </label>
          <br/>

            To be added: MapWithSearchBox component
            { /* <MapWithSearchBox /> */ }

          <br/>
          <label>
            Time:
            <input type="time" value={this.state.time} onChange={this.handleTimeChange} required/>
          </label>
          <br/>

          To be added: AddAttendee and AttendeeList components

          <br/>
          <input type="submit" value="Create Event" />
        </form>
      </div>
    );
  }
}

export default CreateEvent;