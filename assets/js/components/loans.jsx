import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from './api';

function ShowLoans(props) {

function Actions(props) {

  if(props.user_id == props.borrower_id && props.loan.accepted == false) {
    return <div>
             <Button onClick={submit}>Accept</Button>
             <Button onClick={delete_loan}>Decline</Button>
          </div>;
  } else {
    return <div></div>;
  }
}


  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_ACCEPTEDLOANS_FORM',
      data: data,
    };
    //props.dispatch(action);
  }

  function submit(ev) {
   let data = {
		accepted: true,
	       };
    console.log("In ShowLoans");
    console.log(props.loan);
    console.log(data);
 
    let req_loan_data = {
			granted: true,
			};

    let borrower_data = {
			credit: props.loan.requestedloan_id.user_id.credit + props.loan.mini_balance,
                        debit: props.loan.requestedloan_id.user_id.debit - props.loan.mini_balance,
                        };
    let lender_data = {
			debit: props.loan.user_id.debit - props.loan.requestedloan_id.amount,
                      };
    //api.accept_loan(props.loan, props.loan.id);
    api.grant_requestedloan(req_loan_data, props.loan.requestedloan_id.id);
    api.accept_loan(data, props.loan.id);
    //props.dispatch({type: 'CLEAR_ACCEPTEDLOANS_FORM'});
    //Update Borrower's Credit
    api.update_user_details(borrower_data, props.loan.requestedloan_id.user_id.id);
    //Update Lender's Debit
    //api.update_user_details(lender_data, props.loan.user_id.id);
  }

  function delete_loan(ev) {
    api.delete_loan(props.loan.id);
    api.request_loans();
  }

//  return <div>
//    <p>{props.loan.mini_balance}</p>
//  </div>;
  if(props.loan.requestedloan_id.user_id.id == props.token.user_id || props.loan.user_id.id == props.token.user_id) {
  return <div>
    <div className="row">
        <div className="col-md">
           {props.loan.requestedloan_id.id}
        </div>
        <div className="col-md">
           {props.loan.mini_balance}
        </div>
        <div className="col-md">
           {props.loan.colletaral}
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


function Loans(props) {

  let loanList = _.map(props.loans, (nn) => <ShowLoans key={nn.id} loan={nn} token={props.token}/>);

  return <div>
    <div className="row">
        <div className="col-md">
           Request Number
        </div>
        <div className="col-md">
           Return Amount
        </div>
        <div className="col-md">
           Colletaral
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

function state2props(state) {
  return { loans: state.loans,
           users: state.users,};
}

export default connect(state2props)(Loans);
