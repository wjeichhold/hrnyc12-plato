import React from 'react';
import io from '../../../node_modules/socket.io-client/dist/socket.io.js'
import $ from 'jquery';
import Infinite from 'react-infinite';
import MessageItem from './MessageItem.jsx';
const socket = io();

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      room: this.props.eventId,
      divHeights: []
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    socket.on('connect', () => {
      socket.emit('room', this.state.room);
    })
    socket.on('chat message', (msg) => {
      let heights = [];
      let holder = this.state.messages;
      holder.forEach(item => heights.push(0));
      holder.push(msg);
      heights.push(111);
      this.setState({
        messages: holder
      });
    });
  }

  clickHandler(e) {
    console.log("THIS",this);
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
  }

  render() {
    return(
      <div style={{"outline": "#0007 solid thick", "float": "right", "width": "300px", "display": "block", "paddingTop": "1%", "paddingLeft": "1%"}}>
        <Infinite containerHeight={300} elementHeight={30} style={{'listStyleType': 'none', 'margin': 0, 'padding': 0}}
          displayBottomUpwards>
          {this.state.messages.map((item, key) => {
            return <MessageItem message={item} key={key}/>
          })}
        </Infinite>
        <form action="" style={{"paddingTop": "2%", "position": "static"}}>
          <input id="m" autoComplete="off"></input>
          <button style={{"position": "static"}} onClick={this.clickHandler}>Send</button>
        </form>
      </div>
    )
  }
}

export default ChatWindow;
