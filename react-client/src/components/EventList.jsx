import React from 'react';
import axios from 'axios';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.match.params.name,
      number: this.props.match.params.number
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    axios.post('/userEvents', {
      name: this.state.name,
      number: this.state.number
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  render() {
    return (
      <div>
        <div onClick={this.handleClick}>{ this.state.name + ', ' + this.state.number }</div>
      </div>
    )
  }
}

export default EventList;
