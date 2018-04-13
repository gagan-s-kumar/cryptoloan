import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Nav() {
  function auth(ev) {
    window.location.href("/auth/coinbase");
  }
  
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Cryptoloan
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/requestedloans" href="#" className="nav-link">All Loan Requests</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/loans" href="#" className="nav-link">All Loans</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/approvedloans" href="#" className="nav-link">My Loans</NavLink>
        </NavItem>
      </ul>
      <span className="navbar-text">
        <Link className="btn btn-default btn-xs" to={"/auth/coinbase"} onClick={auth}>Coinbase</Link>
      </span>
    </nav>
  );
}
