import React from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';

class LandingPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      eventId: '',
      name: '',
      number: ''
    }
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleIdChange (e) {
    this.setState({
      eventId: e.target.value
    });
  }

  handleNumberChange(e) {
    this.setState({
      number: e.target.value
    })
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  render () {
    const style = {
      // height: 100,
      // width: 100,
      margin: 25,
      textAlign: 'center',
      display: 'inline-block',
      padding: 25,
      primaryColor : '#ff5879'
    };

    return (
    <div className="landingPage">
    <Paper style={style} zDepth={3}>
      <h1>WAYN</h1>
      <h3> Tired of being the first one there? Set up an event with us and we'll take care of the rest. </h3>
      <Link to='/create'><RaisedButton primary={true}>Get Started</RaisedButton></Link>
      <h3>Already invited?</h3>
      <label>
        Enter your event ID
        <input type="text" value={this.state.eventId} onChange={this.handleIdChange} />
      </label>
      <Link to={'/event/' + this.state.eventId}><RaisedButton primary='true'>Submit</RaisedButton></Link>
      <h3>Or see a list of all the events you've made so far</h3>
      <label>
        Enter your name
        <input type="text" value={this.state.name} onChange={this.handleNameChange}></input>
        Enter your number
        <input type="text" value={this.state.number} onChange={this.handleNumberChange}></input>
      </label>
      <Link to={'/eventList/' + this.state.name + '/' + this.state.number}><RaisedButton primary={true}>Submit</RaisedButton></Link>
    </Paper>
    </div>
    )
  }
}

export default LandingPage;
