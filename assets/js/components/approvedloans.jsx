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
    return <td>
             <Button onClick={submit}>Pay Loan</Button>
          </td>;
  } else if(props.user_id == props.loan.user_id.id && props.loan.completed == false) {
    return <td>
            Loan Active
          </td>
  } else {
    return <td>Loan Cleared</td>;
  }
  }

  function submit(ev) {
   let data = {
		completed: true,
	       };

    let borrower_data = {
			credit: props.loan.requestedloan_id.user_id.credit - props.loan.mini_balance,
                        debit: props.loan.requestedloan_id.user_id.debit + props.loan.requestedloan_id.amount,
                        };
    let lender_data = {
			debit: props.loan.user_id.debit + (props.loan.mini_balance - props.loan.requestedloan_id.amount),
                      };
    //api.accept_loan(props.loan, props.loan.id);
    //api.grant_requestedloan(req_loan_data, props.loan.requestedloan_id.id);
    api.accept_loan(data, props.loan.id);
    //props.dispatch({type: 'CLEAR_ACCEPTEDLOANS_FORM'});
    //Update Borrower's Credit
    api.update_user_details(borrower_data, props.loan.requestedloan_id.user_id.id);
    //Update Lender's Debit
    api.update_user_details(lender_data, props.loan.user_id.id);
  }

  if(props.loan.accepted == true && props.loan.requestedloan_id.user_id.id == props.token.user_id) {

  return <tr>
        <td>
           {props.loan.requestedloan_id.id}
        </td>
        <td>
           {props.loan.requestedloan_id.amount}
        </td>
        <td>
           {props.loan.mini_balance}
        </td>
        <td>
           {props.loan.colletaral}
        </td>
        <td>
           {props.loan.requestedloan_id.duration_requested}
        </td>
        <td>
           {props.loan.requestedloan_id.user_id.name}
        </td>
        <td>
           {props.loan.user_id.name}
        </td>
           <Actions user_id={props.token.user_id} borrower_id={props.loan.requestedloan_id.user_id.id} loan={props.loan}/>
  </tr>;

  } else {
    return <tr></tr>;
  }

}


function ApprovedLoans(props) {

  let loanList = _.map(props.loans, (nn) => <ShowLoans key={nn.id} loan={nn} token={props.token}/>);

  return <div>
    <h2>Loan offers for your request</h2>
    <table className="data">
      <tbody>
      <tr>
        <th>
           Request ID
        </th>
        <th>
           Loan Amount
        </th>
        <th>
           Return Amount
        </th>
        <th>
           Colletaral
        </th>
        <th>
           Duration
        </th>
        <th>
           Borrower Name
        </th>
        <th>
           Lender Name
        </th>
        <th>
           Actions
        </th>
    </tr>
    { loanList }
    </tbody>
    </table>
    </div>;


}

function state2props(state) {
  return { loans: state.loans,
           users: state.users,};
}

export default connect(state2props)(ApprovedLoans);
