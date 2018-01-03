import React from 'react';

const EventMap = (props) => (
  <div>
    <h4> Event Map </h4>
    <p> Event ID: {props.match.params.number} </p>
  </div>
)

export default EventMap;