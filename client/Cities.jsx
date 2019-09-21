import React from 'react'

const City = (props) => (
  <div>
    <h3>{props.location}</h3>
    <h2>{props.price}</h2>
  </div>

);

export default City;