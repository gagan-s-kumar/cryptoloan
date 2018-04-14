import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';

function ShowLoans(props) {

//  return <div>
//    <p>{props.loan.mini_balance}</p>
//  </div>;
  return <div>
    <div className="row">
        <div className="col-md">
           {props.loan.id}
        </div>
        <div className="col-md">
           {props.loan.mini_balance}
        </div>
        <div className="col-md">
           {props.loan.colletaral}
        </div>
        <div className="col-md">
           {props.loan.requestedloan_id.id}
        </div>
        <div className="col-md">
           {props.loan.user_id.name}
        </div>
        <div className="col-md">
           <Button onClick={() => alert("TODO: Submit Notification")}>Accept</Button>
        </div>
    </div>
  </div>;

}


export default function Loans(props) {

  let loanList = _.map(props.loans, (nn) => <ShowLoans key={nn.id} loan={nn} />);

  return <div>
    <div className="row">
        <div className="col-md">
           Loan ID
        </div>
        <div className="col-md">
           Minimum Balance
        </div>
        <div className="col-md">
           Colletaral
        </div>
        <div className="col-md">
           Request Number
        </div>
        <div className="col-md">
           Lender name
        </div>
        <div className="col-md">
           Actions
        </div>
    </div>
    { loanList }
    </div>;


}
