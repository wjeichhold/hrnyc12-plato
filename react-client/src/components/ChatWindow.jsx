import React from 'react';
import io from '../../../node_modules/socket.io-client/dist/socket.io.js'
import Infinite from 'react-infinite';
import MessageItem from './MessageItem.jsx';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      room: this.props.eventId,
      message: '',
      socket: io()
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);
  }

  componentDidMount() {
      this.state.socket.on('connect', () => {
        console.log("connected!!!!")
        this.state.socket.emit('room', this.state.room);
      })
      this.state.socket.on('chat message', (msg) => {
        console.log("MESSAGE:", msg);
        let holder = this.state.messages;
        holder.push(msg);
        this.setState({
          messages: holder
        });
      });
  }

  clickHandler(e) {
    this.state.socket.emit('chat message', this.refs.userInput.value)
      this.refs.userInput.value = '';
      console.log("REFS IN CLICK HANDLER",this.refs.userInput.value);
  }

  keyPressHandler(e) {
    if (e.key === 'Enter') {
      this.state.socket.emit('chat message', this.refs.userInput.value)
      this.refs.userInput.value = '';
    }
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
        <div style={{"paddingTop": "2%", "position": "static"}} onKeyUp={this.keyPressHandler}>
          <input ref="userInput" autoComplete="off"></input>
          <button style={{"position": "static"}} onClick={this.clickHandler}>Send</button>
        </div>
      </div>
    )
  }
}

export default ChatWindow;
