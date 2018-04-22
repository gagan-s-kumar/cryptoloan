import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from './api';
import { Redirect } from 'react-router-dom';

function ShowLoans(props) {

function Actions(props) {

  if(props.user_id == props.borrower_id && props.loan.accepted == false) {

   if(!props.wallet){
      return <td>Link your wallet</td>;
    }
    if(props.loan.requestedloan_id.granted) {
      return <td>Other offer Accepted</td>;
    }
    else if(props.loan.mini_balance > (props.wallet.data.balance * props.bitcoin)){
      return <td>Low Bitcoin balance</td>;
    }

    return <td>
             <Button onClick={submit} color="primary">Accept</Button>
             <Button onClick={delete_loan} color="danger">Decline</Button>
          </td>;
  } else if (props.user_id == props.lender_id){
    if(props.loan.accepted == false) {
      return <td>Yet to Accept</td>
    } else if(props.loan.completed) {
      return <td>Loan Completed</td>;
    } else {
      return <td>Loan Active</td>;
    }

  }
  else if(props.user_id==props.borrower_id && props.loan.accepted && props.loan.completed)
    return <td>Loan Cleared</td>;
  else {
    return <td></td>;
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
  return <tr>
        <td>
           {props.loan.requestedloan_id.id}
        </td>
        <td>
           {props.loan.mini_balance}
        </td>
        <td>
           {props.loan.colletaral}
        </td>
        <td>
           {props.loan.user_id.name}

        </td>
    <td>
           {props.loan.requestedloan_id.user_id.name}
        </td>
           <Actions user_id={props.token.user_id} bitcoin={props.bitcoin} wallet={props.wallet} borrower_id={props.loan.requestedloan_id.user_id.id} lender_id={props.loan.user_id.id} loan={props.loan}/>
  </tr>;
  } else {
   return <tr></tr>;
  }

}


function Loans(props) {

  if(!props.token)
    return <Redirect to="/" />;
  let loanList = _.map(props.loans, (nn) => <ShowLoans key={nn.id} loan={nn} bitcoin={props.bitcoin} wallet={props.wallet} token={props.token}/>);
  return <div>
    <h2>Loan offers for your request</h2>
    <table className="data">
      <tbody>
      <tr>
        <th>
           Request ID
        </th>
        <th>
           Return Amount
        </th>
        <th>
           Collateral
        </th>
        <th>
           Lender name
        </th>
        <th>
            Requester Name
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
           users: state.users,
	   wallet: state.wallet,
	   bitcoin: state.bitcoin,};
}

export default connect(state2props)(Loans);
