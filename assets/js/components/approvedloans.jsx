import React from 'react';

function ShowLoans(props) {

  if(props.loan.accepted == true && (props.loan.requestedloan_id.user_id.id == props.token.user_id || props.loan.user_id.id == props.token.user_id)) {

  return <div>
    <div className="row">
        <div className="col-md">
           {props.loan.requestedloan_id.id}
        </div>
        <div className="col-md">
           {props.loan.requestedloan_id.amount}
        </div>
        <div className="col-md">
           {props.loan.mini_balance}
        </div>
        <div className="col-md">
           {props.loan.colletaral}
        </div>
        <div className="col-md">
           {props.loan.requestedloan_id.duration_requested}
        </div>
        <div className="col-md">
           {props.loan.requestedloan_id.user_id.name}
        </div>
        <div className="col-md">
           {props.loan.user_id.name}
        </div>
    </div>
  </div>;

  } else {
    return <div></div>;
  }

}


export default function ApprovedLoans(props) {

  let loanList = _.map(props.loans, (nn) => <ShowLoans key={nn.id} loan={nn} token={props.token}/>);

  return <div>
    <div className="row">
        <div className="col-md">
           Request Number
        </div>
        <div className="col-md">
           Loan Amount
        </div>
        <div className="col-md">
           Return Amount
        </div>
        <div className="col-md">
           Colletaral
        </div>
        <div className="col-md">
           Duration
        </div>
        <div className="col-md">
           Borrower Name
        </div>
        <div className="col-md">
           Lender Name
        </div>
    </div>
    { loanList }
    </div>;


}
