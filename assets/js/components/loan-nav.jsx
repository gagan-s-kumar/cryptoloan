import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import api from './api';

function requested_loans(){
  api.request_requestedloans();
}

function request_loans(){
  api.request_loans();
}

export default function LoansNav(){
  return <div>
    <nav className="nav navbar-expand-lg navbar-light bg-light">
    <ul className="nav">
      <NavItem>
        <NavLink to="/requestedloans" href="#" className="nav-item loan" onClick={requested_loans}>Request a loan</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/loans" href="#" className="nav-item loan" onClick={request_loans}>View Loan offers</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/approvedloans" href="#" className="nav-item loan" onClick={request_loans}>Active loans</NavLink>
      </NavItem>
    </ul>
</nav>
  </div>;
}
