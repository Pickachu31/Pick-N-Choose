import React from 'react'
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

const DateQuery = (props) => (
  <label>
    Birthday
    <mobiscroll.Date placeholder="Please Select..." />
</label>
//   <mobiscroll.Form>
//   <div className="mbsc-grid mbsc-form-grid">
//       <div className="mbsc-row">
//           <div className="mbsc-col-sm-12 mbsc-col-md-6">
//               <mobiscroll.Calendar display="bubble" touchUi={false}>
//                   <mobiscroll.Input inputStyle="box" placeholder="Please Select...">Departure</mobiscroll.Input>
//              </mobiscroll.Calendar>
//           </div>
//           <div className="mbsc-col-sm-12 mbsc-col-md-6">
//               <mobiscroll.Calendar display="bubble" touchUi={false}>
//                   <mobiscroll.Input inputStyle="box" placeholder="Please Select...">Return</mobiscroll.Input>
//              </mobiscroll.Calendar>
//           </div>
//       </div>
//   </div>
// </mobiscroll.Form>
)

export default DateQuery;