import React from 'react';

const MessageItem = (props) => {
  return(
    <div>
      <li style={{ "listStyleType": "none", "width": "100%", "padding": "5px 10px"}}>{props.message}</li>
    </div>
  )
}

export default MessageItem;
