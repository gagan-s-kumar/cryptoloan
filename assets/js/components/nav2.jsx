import React from 'react';
import {NavLink} from 'react-router-dom';
import {Form, FormGroup, NavItem, Input, Button} from 'reactstrap';
import { connect } from 'react-redux';
import api from './api';



export default function Nav2(props) {

  return(
    <nav className="navbar navbar-dark bg-dark navbar-expand">
    <ul className="navbar-nav mr-auto">
<NavItem>
  <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Home</NavLink>
</NavItem>
<NavItem>
  <NavLink to="/requestedloans" href="#" className="nav-link">All Requested Loans</NavLink>
</NavItem>
<NavItem>
  <NavLink to="/loans" href="#" className="nav-link">Offered Loans</NavLink>
</NavItem>
<NavItem>
  <NavLink to="/approvedloans" href="#" className="nav-link">Approved Loans</NavLink>
</NavItem>
<NavItem>
  <NavLink to="/notifications" href="#" className="nav-link">Notifications</NavLink>
</NavItem>

</ul>
</nav>);
}
