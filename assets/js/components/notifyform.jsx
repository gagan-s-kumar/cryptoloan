import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import api from './api';

function NotifyForm(props) {
  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_NOTIFY_FORM',
      data: data,
    };
    props.dispatch(action);
  }

  function submit(ev) {
  let data = {
      user_id: props.token.user_id,
      bclimit: props.notify_form.bclimit,
      lclimit: props.notify_form.lclimit,
      etlimit: props.notify_form.etlimit
    };

    let k = parseInt(props.notify_form.bclimit);
    let l = parseInt(props.notify_form.lclimit);
    let m = parseInt(props.notify_form.etlimit);
    console.log("k", k);
    console.log(isNaN(k));

    if(isNaN(k) || isNaN(l) || isNaN(m)){
      console.log("inside error dispatch");
      props.dispatch({type: 'ERROR', msg: 'Please enter valid numbers!'});
    }
    else {
      api.new_notification(data);
      props.dispatch({type: 'CLEAR_NOTIFY_FORM'});
    }
}

  if (props.token==null)
    return <Redirect to="/" />;


  let users = _.find(props.users, function (uu){
      return uu.id == props.token.user_id;
    });

  return <div style={{padding: "4ex"}}>
    <h2>Subscribe for new alerts:</h2>
    <FormGroup>
      <Label for="bclimit">BitCoin Alert Limit:</Label>
      <Input type="number" name="bclimit" value={props.notify_form.bclimit} onChange={update} min="0" />
    </FormGroup>
    <FormGroup>
      <Label for="lclimit">LiteCoin Alert Limit:</Label>
      <Input type="number" name="lclimit" value={props.notify_form.lclimit} onChange={update} min="0"/>
    </FormGroup>
    <FormGroup>
      <Label for="etlimit">Ethereum Alert Limit:</Label>
      <Input type="number" name="etlimit" value={props.notify_form.etlimit} onChange={update} min="0"/>
    </FormGroup>
    <Button color="primary" onClick={submit}>Submit</Button>
</div>;


}

function state2props(state) {
  return { notify_form: state.notify_form,
           users: state.users};
}

export default connect(state2props)(NotifyForm);
