import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api';
import Cookies from 'universal-cookie';
import store from './store';
import FaUser from 'react-icons/lib/fa/user'

function WalletInfo(params) {
  return <div className="navbar-text">
	<nav>
        <NavItem>
          <NavLink to="/users" href="#" className="nav-link"><FaUser size={40} />Profile</NavLink>
        </NavItem>
        <NavItem>
          <Button onClick={reset_token}>Logout</Button>
        </NavItem>
	</nav>
    </div>;
}

    //Balance: BTC {params.wallet.balance}
function reset_token(ev) {
    api.submit_logout();
}

let Session = connect(({token}) => {return {token};})((props) => {
    return <div className="navbar-text ">
    <nav>
    <NavItem className="user">
	<NavLink to="/users" href="#" className="nav-link navbar-center user"><FaUser size={40} />Profile</NavLink>
    </NavItem>
    <NavItem>
      <Link className="btn btn-primary btn-xs" to={"/auth/coinbase"} onClick={auth}>Link your Wallet</Link>
    	<Link to={"/"}><Button onClick={reset_token} className="logout">Logout</Button></Link>
    </NavItem>
    </nav>
  </div>;
});

function auth(ev) {
  window.location.href("/auth/coinbase");
}
function Nav2(props) {

  let wallet;
  let session_info;
  let token;
  let cookie = new Cookies();
  if (props.token) {
    token = props.token;
  }
  else if(cookie.get('token')){
    let c_token = cookie.get('token');
    let c_user = cookie.get('user_id');
    token = {token: c_token, user_id: c_user};
    store.dispatch({type: 'SET_TOKEN', token: token});
  }

    wallet = _.find(props.wallets, function(w){ if(w.user.id==token.user_id) return w});
    if(wallet && props.wallet) {
      session_info = <WalletInfo token={token} wallet={wallet} />
    }
    else if(wallet && !props.wallet){
      console.log("Wallet");
      api.request_user_wallet(props.token.user_id);
      session_info = <Session token={token} />;
    }
    else
      session_info = <Session token={token} />;

  return(
	    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <span className="navbar-brand">
        Cryptoloan
      </span>
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
          <NavLink to="/approvedloans" href="#" className="nav-link">Accepted Loans</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/notifications" href="#" className="nav-link">Notifications</NavLink>
        </NavItem>
      </ul>
      <ul className="nav navbar-nav navbar-right">
	<NavItem>
          <span className="nav-item navbar-right">
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
    wallets: state.wallets,
    wallet: state.wallet,
  };
}

export default connect(state2props)(Nav2);
