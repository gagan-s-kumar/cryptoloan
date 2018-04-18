import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import api from './api';

function EditNotifyForm(props) {

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
      api.update_notification(data, props.task.id);
      props.dispatch({type: 'CLEAR_EDIT_NOTIFY_FORM'});
    }
}

  let users = _.find(props.users, function (uu){
      return uu.id == props.token.user_id;
    });

    console.log("task props", props.task);
    if(props.notify_form.user_id=="")
    {
      let data = {
          user_id: props.token.user_id,
          bclimit: props.task.bclimit,
          lclimit: props.task.lclimit,
          etlimit: props.task.etlimit
        };
        let action = {
          type: 'UPDATE_NOTIFY_FORM',
          data: data,
        };
        props.dispatch(action);
    }

  return <div style={{padding: "4ex"}}>
    <h2>Update alerts:</h2>
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
    <Button onClick={submit}>Update</Button>
    <Link to={"/notifications"}>Back to Notifications</Link>
</div>;


}

function state2props(state) {
  return { notify_form: state.notify_form,
           users: state.users};
}

export default connect(state2props)(EditNotifyForm);
