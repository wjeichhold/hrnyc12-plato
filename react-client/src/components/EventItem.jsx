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
    if (nextProps.attendees.length === 0) {
      console.log('no attendees')
    }
    this.setState({
      attendees: nextProps.attendees
    });
  }

  render() {
    return (
      <div>
        <div style={{"display": "block", "textAlign": "left", "outline": "#000 solid thick", "width": "30%", "backgroundColor": "#96B3D3"}}>
          <h1 style={{"paddingLeft": "10%"}}>{this.state.eventName}</h1>
          <h4 style={{"paddingLeft": "10%"}}> Current Attendees: </h4>
        </div>
        {console.log("PROPS ATTENDEES",this.state.attendees)}
        <AttendeeList attendees={this.state.attendees}/>
      </div>
    )
  }
}

export default EventItem;
