import React from 'react';
import axios from 'axios';
import EventItem from './EventItem.jsx'

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.match.params.name,
      number: this.props.match.params.number,
      enteredUserInfo: [],
      enteredUsersEvents: [],
      attendees: []
    }
    this.getEvents = this.getEvents.bind(this);
    this.getAttendees = this.getAttendees.bind(this);
  }

  componentDidMount() {
    var x = this.state.name.indexOf(' ')
    if(x >= 0){
    var firstName = this.state.name.slice(0, x)
    } else{
      firstName = this.state.name
    }
    axios.post('/userEvents', {
      name: firstName,
      number: this.state.number
    })
    .then((response) => {
      this.setState({
        enteredUserInfo: response.data
      })
    })
    .then(this.getEvents)
    .catch((err) => {
      console.error(err);
    })
  }

  getEvents() {
    axios.post('/usersEvents', {
      enteredUserInfo: this.state.enteredUserInfo
    })
    .then((response) => {
      let arr = [];
      response.data.forEach((item) => {
        arr = arr.concat(item);
      })
      this.setState({
        enteredUsersEvents: arr
      });
    })
    .then(this.getAttendees)
    .catch((err) => {
      console.error(err);
    })
  }

  getAttendees() {
    axios.post('/eventAttendees', {
      enteredUsersEvents: this.state.enteredUsersEvents
    })
    .then((response) => {
      console.log("CLIENT SIDE RESPONSE:", response.data);
      this.setState({
        attendees: response.data
      });
    })
    .catch((err) => {
      console.error(err);
    })
  }

  render() {
    return (
      <div>
        {this.state.enteredUsersEvents.map((item, ind) => {
          return <EventItem evt={item} attendees={this.state.attendees[ind]} key={ind}/>
        })}
      </div>
    )
  }
}

export default EventList;
