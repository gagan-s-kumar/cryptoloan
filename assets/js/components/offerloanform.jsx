import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api';

function OfferLoanForm(props) {

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_LOANS_FORM',
      data: data,
    };
    props.dispatch(action);
  }

  function submit(ev) {
    let data = {
       mini_balance: props.loans_form.mini_balance,
   colletaral: props.loans_form.colletaral,
   accepted: false,
   completed: false,
   requestedloan_id: props.re1.id,
   user_id: props.token.user_id
        };
        let k = parseInt(props.loans_form.mini_balance);
        let l = parseInt(props.loans_form.colletaral);
        if(isNaN(k) || isNaN(l) || (k<0) || (l<0)){
          props.dispatch({type: 'ERROR', msg: 'Please enter valid numbers!'});
        }
        else if(parseInt(props.re1.amount) > k){
	  props.dispatch({type: 'ERROR', msg: 'Return amount should be greater than Loan amount.'});
	}
        else if(!props.wallet){
	  props.dispatch({type: 'ERROR', msg: 'Please link your Coinbase wallet'});
        }
        else if(k >= l){
          props.dispatch({type: 'ERROR', msg:'Collateral must be greater than Return Amount'});
        }
        else {
   api.new_loans(data);
   //api.request_loans();
   props.dispatch({type: 'CLEAR_LOANS_FORM'});
   //props.dispatch({type: 'ERROR', msg: 'Loan Offered!'});
  }
  }

  if(!props.token)
    return <Redirect to="/" />;

  return <div style={{padding: "4ex"}}>
    <h2>Offer Loan</h2>
    <div>Lend loan to:{props.re1.user_id.name}</div>
    <div>Loan amount:{props.re1.amount}</div>
    <FormGroup>
      <Label for="mini_balance">Return Amount:</Label>
      <Input type="number" name="mini_balance" value={props.loans_form.mini_balance} onChange={update}/>
    </FormGroup>
    <FormGroup>
      <Label for="colletaral">Collateral:</Label>
      <Input type="number" name="colletaral" value={props.loans_form.colletaral} onChange={update}/>
    </FormGroup>
    <Button onClick={submit} color="primary">Offer Loan</Button>
</div>;


}

function state2props(state) {
  return { loans_form: state.loans_form,
           users: state.users,
	   wallet: state.wallet, };
}

export default connect(state2props)(OfferLoanForm);
