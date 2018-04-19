import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';


function Status(props) {
  if(props.status) {
    return <div>
             <Button color="primary">Granted</Button>
           </div>;
  } else {
    return <div>
            <Button color="primary">Pending</Button>
           </div>;
  }
}

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
           {props.req.duration_requested}
        </div>
        <div className="col-md">
           <Status status={props.req.granted} />
        </div>
    </div>
  </div>;

}


export default function Requestloans(props) {

  let req1 = _.map(props.ln, (nn) => <ShowRequests key={nn.id} req={nn} token={props.token}/>);

  return <div>
    <h2>All Requested Loans</h2>
    <div className="row">
        <div className="col-md">
           Request Number
        </div>
        <div className="col-md">
           Amount
        </div>
        <div className="col-md">
           Duration Requested
        </div>
        <div className="col-md">
           Status
        </div>
    </div>
    { req1 }
    </div>;

}
