import React from 'react';
import { Redirect } from 'react-router';

function ShowNotifications(props) {

  return <div>
    <div className="row">
        <div className="col-md">
           {props.note.id}
        </div>
        <div className="col-md">
           {props.note.bclimit}
        </div>
        <div className="col-md">
           {props.note.lclimit}
        </div>
        <div className="col-md">
           {props.note.etlimit}
        </div>
    </div>

  </div>;

}


export default function Notifylist(props) {

  if(props.token==null) 
	return <Redirect to="/" />;

  let mylist = _.filter(props.notify, function(kk){ return kk.user_id.id == props.token.user_id})
  let notifyList = _.map(mylist, (nn) => <ShowNotifications key={nn.id} note={nn} />);

  return <div>
      <h2>Your Notifications</h2>
      <div className="row">
	<div className="col-md">
	   Notification ID
	</div>
	<div className="col-md">
	   BC Limit
	</div>
	<div className="col-md">
	   LC Limit
	</div>
	<div className="col-md">
	   Ethereum Limit
	</div>
      </div>
      {notifyList}
    </div>;

}
