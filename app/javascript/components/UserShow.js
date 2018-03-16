import React from 'react';
import { browserHistory } from 'react-router';

const UserShow = props => {
  return(
    <div className="user-show">
      <img src="/uploads/profile_pics/1272196_1374363896191760_1199557230939447196_o.jpg" height="200px" width="200px"/><h2>{props.username}</h2>
          <h4 label="email">{props.email}</h4>
        <div className="button" onClick={browserHistory.goBack}>
        Back
      </div>
    </div>
  )
}

export default UserShow;
