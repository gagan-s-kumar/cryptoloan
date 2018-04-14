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
    console.log(action);
    params.dispatch(action);
  }

  function submit(ev) {
    if(params.user_form.name=="" || params.user_form.email=="" || params.user_form.password=="")
      alert("All fields are mandatory!");
    else{
      console.log("Should create user.");
      api.submit_user(params.user_form);
      alert("User created successfully!");
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
      <Label for="name">Name</Label>
      <Input type="text" name="name" value={params.user_form.name} onChange={update} />
    </FormGroup>
    <FormGroup>
    <Label for="email">Email</Label>
      <Input type="text" name="email" value={params.user_form.email} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="password">Password</Label>
      <Input type="password" name="password" value={params.user_form.password} onChange={update} />
    </FormGroup>
    <Button onClick={submit} color="primary">Create</Button>
    <Button onClick={clear} >Clear</Button>
  </div>;
}

function state2props(state) {
  return { user_form: state.user_form };
}

// Export the result of a curried function call.
export default connect(state2props)(UserForm);
