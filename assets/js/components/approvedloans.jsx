import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from './api';

function ShowLoans(props) {

  function Actions(props) {

  console.log("=====");
  console.log(props.user_id);
  console.log(props.borrower_id);
  console.log(props.loan.completed);
  console.log(props.loan);

  if(props.user_id == props.borrower_id && props.loan.completed == false) {
    return <div>
             <Button onClick={submit}>Pay Loan</Button>
          </div>;
  } else if(props.user_id == props.loan.user_id.id && props.loan.completed == false) {
    return <div>
            Loan Active
           </div>
  } else {
    return <div>Loan Cleared</div>;
  }
  }

  function submit(ev) {
   let data = {
		completed: true,
	       };
 
    let borrower_data = {
			credit: props.loan.requestedloan_id.amount,
                        };
    let lender_data = {
			debit: props.loan.requestedloan_id.amount,
                      };
    //api.accept_loan(props.loan, props.loan.id);
    //api.grant_requestedloan(req_loan_data, props.loan.requestedloan_id.id);
    api.accept_loan(data, props.loan.id);
    //props.dispatch({type: 'CLEAR_ACCEPTEDLOANS_FORM'});
    //Update Borrower's Credit
    //api.update_user_details(borrower_data, props.loan.requestedloan_id.user_id.id);
    //Update Lender's Debit
    //api.update_user_details(lender_data, props.loan.user_id.id);
  }

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
        <div className="col-md">
           <Actions user_id={props.token.user_id} borrower_id={props.loan.requestedloan_id.user_id.id} loan={props.loan}/>
        </div>
    </div>
  </div>;

  } else {
    return <div></div>;
  }

}


function ApprovedLoans(props) {

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
        <div className="col-md">
           Actions
        </div>
    </div>
    { loanList }
    </div>;


}

function state2props(state) {
  return { loans: state.loans,
           users: state.users,};
}

export default connect(state2props)(ApprovedLoans);
