import React from 'react';
import axios from 'axios';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.match.params.name,
      number: this.props.match.params.number
    }
  }



  render() {
    return (
      <div>
        <div>{ this.state.name + ', ' + this.state.number }</div>
      </div>
    )
  }
}

export default EventList;
