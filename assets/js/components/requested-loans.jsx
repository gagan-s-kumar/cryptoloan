import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';

function ShowRequests(props) {

  //return <div>
  //  <p>{props.req.amount}</p>
  //</div>;
  return <div>
    <div className="row">
        <div className="col-md">
           {props.req.id}
        </div>
        <div className="col-md">
           {props.req.amount}
        </div>
        <div className="col-md">
           {props.req.user_id}
        </div>
        <div className="col-md">
           <Button onClick={() => alert("TODO: Submit Notification")}>Accept</Button>
           <Button onClick={() => alert("TODO: Submit Notification")}>Reject</Button>
        </div>
    </div>
  </div>;

}


export default function Requestloans(props) {

  let req1 = _.map(props.ln, (nn) => <ShowRequests key={nn.id} req={nn} />);

  return <div>
    <h2>Loan Requests</h2>
    <div className="row">
        <div className="col-md">
           Application ID
        </div>
        <div className="col-md">
           Amount
        </div>
        <div className="col-md">
           Requested By
        </div>
        <div className="col-md">
           Actions
        </div>
    </div>
    { req1 }
    </div>;

}
