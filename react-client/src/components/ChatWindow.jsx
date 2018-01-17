import React from 'react';

class ChatWindow extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div>
        <ul id="messages"></ul>
        <form action="">
          <input id="m" autoComplete="off"></input>
          <button>Send</button>
        </form>
      </div>
    )
  }
}

export default ChatWindow;
