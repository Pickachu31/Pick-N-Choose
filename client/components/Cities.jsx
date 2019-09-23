import React from 'react'

const City = (props) => {
  return (
    <div id="city">
      <h3>{props.location}</h3>
      {/* <div> */}
      <h2>{props.price}</h2>
      {/* <p></p> */}
      {/* </div> */}
    </div>
  );
}

export default City;