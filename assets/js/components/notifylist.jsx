import React from 'react';

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
  console.log("notify list:",props);
  let notifyList = _.map(props.notify, (nn) => <ShowNotifications key={nn.id} note={nn} />);

  //console.log("after", notifyList);

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
