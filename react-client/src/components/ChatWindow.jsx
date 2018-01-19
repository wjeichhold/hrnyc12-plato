import React from 'react';
import io from '../../../node_modules/socket.io-client/dist/socket.io.js'
import Infinite from 'react-infinite';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MessageItem from './MessageItem.jsx';
import axios from 'axios';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
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

      axios.post('/server/chatMessages', {room: this.state.room}).then((data) => {
        console.log('DID WE ACCESSS DAT SUPER HOT FIRE', data)
        this.setState({messages: data.data})
      })
  }

  clickHandler(e) {
    this.state.socket.emit('chat message', this.state.username + ': ' + this.refs.userInput.getValue())
      this.refs.userInput.input.value = '';
      console.log("REFS IN CLICK HANDLER",this.refs.userInput.value);
  }

  keyPressHandler(e) {
    if (e.key === 'Enter') {
      this.state.socket.emit('chat message', this.state.username + ': ' + this.refs.userInput.getValue())
      this.refs.userInput.input.value = '';
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
        <div style={{"paddingTop": "2%", "display": "block"}} onKeyUp={this.keyPressHandler}>
          <TextField
            id="inputText"
            ref="userInput"
            label="Bootstrap"
          />
          <RaisedButton onClick={this.clickHandler}>Send</RaisedButton>
        </div>
      </div>
    )
  }
}

export default ChatWindow;
