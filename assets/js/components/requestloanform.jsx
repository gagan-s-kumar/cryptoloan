import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import { connect } from 'react-redux';
import api from './api';

function RequestLoanForm(props) {

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_REQUESTEDLOANS_FORM',
      data: data,
    };
    props.dispatch(action);
  }

  function submit(ev) {
    let date2 = props.requestedloans_form.loan_date.toString() + "T12:00:00Z";
    let data = {
    		user_id: props.token.user_id,
		amount: props.requestedloans_form.amount,
		duration_requested: date2,
		granted: false
	       };

    let k = parseInt(props.requestedloans_form.amount);

    if(isNaN(k)){
      console.log("inside error dispatch");
      props.dispatch({type: 'ERROR', msg: 'Please enter valid numbers!'});
    }
    else if(!props.wallet) {
      props.dispatch({type: 'ERROR', msg: 'Please link your Coinbase Wallet'});
    }
    else if((props.wallet.data.balance * props.bitcoin) <= parseInt(props.requestedloans_form.amount)) {
      props.dispatch({type: 'ERROR', msg: 'You do not have enough balance to request this loan.'});
    }
    else {
    api.new_requestedloans(data);
    props.dispatch({type: 'CLEAR_REQUESTEDLOANS_FORM'});
    api.request_requestedloans();
  }
}
  
  return <div style={{padding: "4ex"}}>
    <h2>Request A New Loan</h2>
    <FormGroup>
      <Label for="amount">Request Amount:</Label>
      <Input type="number" name="amount" value={props.requestedloans_form.amount} onChange={update}/>
    </FormGroup>
    <FormGroup>
      <Label for="loan_date">Expected Repay Date:</Label>
      <Input type="date" name="loan_date" value={props.requestedloans_form.loan_date} onChange={update}/>
    </FormGroup>

    <Button onClick={submit} color="primary">Request Loan</Button>
</div>;


}

function state2props(state) {
  return { requestedloans_form: state.requestedloans_form,
           users: state.users,
	   wallet: state.wallet,};
}

export default connect(state2props)(RequestLoanForm);
