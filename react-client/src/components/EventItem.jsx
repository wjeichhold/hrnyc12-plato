import React from 'react'
import AttendeeList from './AttendeeList.jsx';

class EventItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventName: this.props.evt.eventName,
      attendees: []
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("NORMAL PROPS", this.props, "NEXT PROPS", nextProps)
    this.setState({
      attendees: nextProps.attendees
    });
  }

  render() {
    return (
      <div>
        {console.log("PROPS ATTENDEES",this.state.attendees)}
        <h1>{this.state.eventName}</h1>
        <AttendeeList attendees={this.state.attendees}/>
      </div>
    )
  }
}

export default EventItem;
