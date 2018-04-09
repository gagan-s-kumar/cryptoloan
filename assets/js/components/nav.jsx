import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';

export default function Nav() {
  return (
    <div className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Cryptoloan
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/requestedloans" href="#" className="nav-link">Loan Requests</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/loans" href="#" className="nav-link">My Loans</NavLink>
        </NavItem>
      </ul>
      <span className="navbar-text">
        Login
      </span>
    </div>
  );
}
