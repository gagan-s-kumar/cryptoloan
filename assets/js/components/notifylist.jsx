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

  return <tr>
        <td>
           {props.note.id}
        </td>
        <td>
           {props.note.bclimit}
        </td>
        <td>
           {props.note.lclimit}
        </td>
        <td>
           {props.note.etlimit}
        </td>
        <td>
          <Link to={"/editnotifications/"+props.note.id}><Button color="primary">Reset</Button></Link>
        </td>
        <td>
          <Button onClick={delete_notification} color="danger">Delete</Button>
        </td>
  </tr>;

}


export default function Notifylist(props) {

  if(props.token==null)
	return <Redirect to="/" />;

  let mylist = _.filter(props.notify, function(kk){ return kk.user_id.id == props.token.user_id})
  let notifyList = _.map(mylist, (nn) => <ShowNotifications key={nn.id} note={nn} />);

  return <div>
      <h2>Your Notifications</h2>
      <table className="data">
        <tbody>
        <tr>
        	<th>
        	   Notification ID
        	</th>
        	<th>
        	   BC Limit
        	</th>
        	<th>
        	   LC Limit
        	</th>
        	<th>
        	   Ethereum Limit
        	</th>
          <th colSpan="2">
              Edit Options
        	</th>

        </tr>
      {notifyList}
      </tbody>
    </table>
    </div>;

}
