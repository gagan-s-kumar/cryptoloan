import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';

function ShowUsers(props) {

  if(props.token.user_id == props.user.id) {

  return <div>
    <div className="col">
        <div className="row-md">
           User ID    : {props.user.id}
        </div>
        <div className="row-md">
           User Name  : {props.user.name}
        </div>
        <div className="row-md">
           Email      : {props.user.email}
        </div>
        <div className="row-md">
           <Button onClick={() => alert("TODO: Submit Notification")}>Edit</Button>
        </div>
    </div>

  </div>;
  } else {
    return <div></div>;
  }

}


export default function Userlist(props) {
 
  let userList = _.map(props.users, (nn) => <ShowUsers key={nn.id} user={nn} token={props.token}/>);

  return <div>
      <h2>Your Profile</h2>
      {userList}
    </div>;

}
