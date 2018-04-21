import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from './api';

function UserForm(params) {
  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_USER_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  function submit(ev) {
    if(params.user_form.name=="" || params.user_form.email=="" || params.user_form.password=="")
      params.dispatch({type: 'ERROR', msg: 'All fields are mandatory'});
    else{
      console.log("Should create user.");
      api.submit_user(params.user_form);
      clear("");
    }
  }

  function clear(ev) {
    params.dispatch({
      type: 'CLEAR_USER_FORM',
    });
  }

  return <div style={ {padding: "4ex"} }>
    <h2>Register User</h2>
    <FormGroup>
      <Label for="name">Name (Same name as your Coinbase account)</Label>
      <Input type="text" name="name" value={params.user_form.name} onChange={update} placeholder="Coinbase Name"/>
    </FormGroup>
    <FormGroup>
    <Label for="email">Email</Label>
      <Input type="text" name="email" value={params.user_form.email} onChange={update} placeholder="Email"/>
    </FormGroup>
    <FormGroup>
      <Label for="password">Password</Label>
      <Input type="password" name="password" value={params.user_form.password} onChange={update} placeholder="Password"/>
    </FormGroup>
    <FormGroup>
      <Label for="password_confirmation">Confirm Password</Label>
      <Input type="password" name="password_confirmation" value={params.user_form.password_confirmation} onChange={update} placeholder="Confirm Password" />
    </FormGroup>
    <Button onClick={submit} color="primary">Register</Button>
  </div>;
}

function state2props(state) {
  return { user_form: state.user_form };
}

// Export the result of a curried function call.
export default connect(state2props)(UserForm);
