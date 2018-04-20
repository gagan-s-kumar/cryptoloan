import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

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

function Show(props) {
  if(!props.status && (props.id != props.token.user_id)) {
    if(props.user.debit < props.req.amount)
      return <div>Low Balance</div>;
    return <div>
            <Link to={"/offeredloan/"+props.req.id}><Button color="primary">Offer Loan</Button></Link>
           </div>;
  } else {
    return <div>
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
        <div className="col-md">
           <Show status={props.req.granted} req={props.req} token={props.token} id={props.req.user_id.id} user={props.user}/>
         </div>
    </div>
  </div>;

}


export default function Requestloans(props) {

  let req1 = _.map(props.ln, (nn) => <ShowRequests key={nn.id} req={nn} token={props.token} user={props.user} />);
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
        <div className="col-md">
        </div>
    </div>
    { req1 }
    </div>;

}
