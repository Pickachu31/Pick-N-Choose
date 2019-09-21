import React from 'react'

const City = (props) => {
  return (
    <div id="city">
      <h3>{props.location}</h3>
      <p>
      <h2>{props.price}</h2>
     </p>
    </div>
  );
}

export default City;