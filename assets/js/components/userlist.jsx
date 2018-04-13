import React from 'react';

function ShowUsers(props) {

  return <div>
    <div className="row">
        <div className="col-md">
           {props.user.id}
        </div>
        <div className="col-md">
           {props.user.name}
        </div>
        <div className="col-md">
           {props.user.email}
        </div>
    </div>

  </div>;

}


export default function Userlist(props) {
  let userList = _.map(props.users, (nn) => <ShowUsers key={nn.id} user={nn} />);

  return <div>
      <h2>All Users</h2>
      <div className="row">
	<div className="col-md">
	   User ID
	</div>
	<div className="col-md">
	   Name
	</div>
	<div className="col-md">
	   Email
	</div>
      </div>
      {userList}
    </div>;

}
