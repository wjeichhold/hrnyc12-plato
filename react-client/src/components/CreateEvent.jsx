import React from 'react';

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

  render () {
    return (
      <div>
        <h4> Create Event </h4>
        <form>
          <label>
            Event Name:
            <input type="text" value={this.state.eventName} onChange={this.handleEventNameChange} />
          </label>
          <br/>
            To be added: MapWithSearchBox component
            { /* <MapWithSearchBox /> */ }
          <br/>
          <label>
            Time:
            <input type="time" value={this.state.time} onChange={this.handleTimeChange} />
          </label>
          <br/>
        </form>
      </div>
    );
  }
}

export default CreateEvent;