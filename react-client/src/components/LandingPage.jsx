import React from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      eventId: ''
    }
    this.handleIdChange = this.handleIdChange.bind(this);
  }

  handleIdChange (e) {
    this.setState({
      eventId: e.target.value
    });
  }

  render () {
    return (
    <div className="landingPage">
      <h1>WAYN</h1>
      <Link to='/create'><button>Create Event</button></Link>
      <h3>OR</h3>
      <label>
        Enter your event ID: 
        <input type="text" value={this.state.eventId} onChange={this.handleIdChange} />
      </label>
      <Link to={'/event/' + this.state.eventId}><button>Submit</button></Link>
    </div>
    )
  }
}

export default LandingPage;