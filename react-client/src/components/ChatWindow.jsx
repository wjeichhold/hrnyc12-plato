import React from 'react';
import io from '../../../node_modules/socket.io-client/dist/socket.io.js'
import $ from 'jquery';
const socket = io();

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      room: this.props.eventId
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    socket.on('connect', () => {
      socket.emit('room', this.state.room);
    })
    socket.on('chat message', (msg) => {
      console.log('how many times?', msg);
      $('#messages').append($('<li>').text(msg));
      $('#messages').animate({scrollTop: $('#messages').prop('scrollHeight')}, 500);
    })
  }

  clickHandler(e) {
    console.log("THIS",this);
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
  }

  render() {
    return(
      <div style={{"outline": "#00FF00 solid thick", "float": "right", "width": "50%", "display": "block", "padding-top": "50%", "overflowY": "auto"}}>
        <ul id="messages" style={{'listStyleType': 'none', 'margin': 0, "height": "100%", 'padding': 0}}></ul>
        <form action="" style={{'background': '#F0F8FF', 'padding': '3px', 'position': 'relative'}}>
          <input id="m" autoComplete="off"></input>
          <button onClick={this.clickHandler}>Send</button>
        </form>
      </div>
    )
  }
}

export default ChatWindow;
