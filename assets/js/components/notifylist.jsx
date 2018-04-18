import React from 'react';
import { Button, FormGroup, Label, Input} from 'reactstrap';
import { Link } from 'react-router-dom';

import api from './api';
import store from './store';

import { Redirect } from 'react-router';


function ShowNotifications(props) {

  function delete_notification(ev){
    api.delete_notifications(props.note.id);
    api.request_notifications();
    api.request_notifications();
  }

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
        <div className="col-md">
          <Link to={"/editnotifications/"+props.note.id}><Button>Edit</Button></Link>
        </div>
        <div className="col-md">
          <Button onClick={delete_notification}>Delete</Button>
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
  <div className="col-md">

	</div>
  <div className="col-md">

	</div>
      </div>
      {notifyList}
    </div>;

}
