import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api';
import Cookies from 'universal-cookie';
import store from './store';
import FaUser from 'react-icons/lib/fa/user'

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
  }

  return <div className="navbar-text log">
    <Form inline>
      <FormGroup>
        <Input type="text" name="email" placeholder="email"
               value={props.login.email} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="password"
               value={props.login.pass} onChange={update} />
      </FormGroup>
      <Button onClick={create_token}>Log In</Button>
    </Form>
  </div>;
});



function Nav(props) {

  let  session_info = <LoginForm />

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Cryptoloan
      </span>
      <ul className="navbar-nav mr-auto">
	<NavItem>
          <span className="navbar-text">
	    { session_info }
          </span>
	</NavItem>
      </ul>
    </nav>
  );
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Nav);
