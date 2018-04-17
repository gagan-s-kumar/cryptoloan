import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';

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
    api.new_notification(data);
    props.dispatch({type: 'CLEAR_NOTIFY_FORM'});
    api.request_notifications();
}
  console.log("props",props);
  console.log("token user id",props.token.user_id);

  let users = _.find(props.users, function (uu){
      return uu.id == props.token.user_id;
    });
  console.log("users", users);

  return <div style={{padding: "4ex"}}>
    <h2>Subscribe to alerts:</h2>
    <FormGroup>
      <Label for="user_id">User:</Label>
      <Input type="hidden" name="user_id" value={props.notify_form.user_id}></Input><span>{users.name}</span>
    </FormGroup>
    <FormGroup>
      <Label for="bclimit">BitCoin Alert Limit:</Label>
      <Input type="number" name="bclimit" value={props.notify_form.bclimit} onChange={update}/>
    </FormGroup>

    <FormGroup>
      <Label for="lclimit">LiteCoin Alert Limit:</Label>
      <Input type="number" name="lclimit" value={props.notify_form.lclimit} onChange={update}/>
    </FormGroup>

    <FormGroup>
      <Label for="etlimit">Ethereum Alert Limit:</Label>
      <Input type="number" name="etlimit" value={props.notify_form.etlimit} onChange={update}/>
    </FormGroup>
    <Button onClick={submit}>Submit</Button>
</div>;


}

function state2props(state) {
  return { notify_form: state.notify_form,
           users: state.users};
}

export default connect(state2props)(NotifyForm);
