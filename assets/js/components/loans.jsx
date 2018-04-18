import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from './api';

function ShowLoans(props) {


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
    //api.accept_loan(props.loan, props.loan.id);
    api.accept_loan(data, props.loan.id);
    //props.dispatch({type: 'CLEAR_ACCEPTEDLOANS_FORM'});
    api.request_loans();
  }

  function delete_loan(ev) {
    api.delete_loan(props.loan.id);
    api.request_loans();
  }

//  return <div>
//    <p>{props.loan.mini_balance}</p>
//  </div>;
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
           <Button onClick={submit}>Accept</Button>
           <Button onClick={delete_loan}>Decline</Button>
        </div>
    </div>
  </div>;

}


function Loans(props) {

  let loanList = _.map(props.loans, (nn) => <ShowLoans key={nn.id} loan={nn} />);

  return <div>
    <div className="row">
        <div className="col-md">
           Request Number
        </div>
        <div className="col-md">
           Minimum Balance
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
