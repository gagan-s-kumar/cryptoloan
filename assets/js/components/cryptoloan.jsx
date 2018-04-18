import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import Cookies from 'universal-cookie';

import Nav from './nav';
import HomePage from './home';
import Loans from './loans';
import ApprovedLoans from './approvedloans';
import Requestloans from './requested-loans';
import NotifyForm from './notifyform';
import RequestLoanForm from './requestloanform';
import OfferLoanForm from './offerloanform';
import Notifylist from './notifylist';
import Userlist from './userlist';
import UserForm from './registration-form';
import Nav2 from './nav2'


export default function cryptoloan_init(store) {
  let root = document.getElementById('root');
  ReactDOM.render(
    <Provider store={store}>
      <Cryptoloan />
      </Provider>,
      root);
}

let Cryptoloan = connect((state) => state)((props) => {

  let cookies = new Cookies();
  if(cookies.get('token')){
  return (
    <Router>
      <div>
        <Nav/>
        <Nav2 />
	 {props.errors}
          <Route path="/" exact={true} render={() =>
            <div>
              <HomePage notify={props.notifications} graph={props.graph} token={props.token} bitcoin={props.bitcoin} litecoin={props.litecoin} ethereum={props.ethereum}/>
            </div>
          } />

        <Route path="/loans" exact={true} render={() =>
            <div>
              <Loans loans={props.loans} token={props.token}/>
            </div>
          } />

        <Route path="/notifications" exact={true} render={() =>
            <div>
              <NotifyForm users={props.users} token={props.token}/>
              <Notifylist notify={props.notifications} token={props.token}/>
            </div>
          } />

        <Route path="/users" exact={true} render={() =>
            <div>
              <Userlist users={props.users} token={props.token} wallets={props.wallets} />
            </div>
          } />

        <Route path="/approvedloans" exact={true} render={() =>
              <div>
                <ApprovedLoans loans={props.loans} token={props.token}/>
              </div>
            } />

        <Route path="/requestedloans" exact={true} render={() =>
              <div>
                <RequestLoanForm users={props.users} token={props.token}/>
                <OfferLoanForm requestedloans={props.requestedloans} token={props.token}/>
                <Requestloans ln={props.requestedloans} token={props.token}/>
              </div>
            } />

      </div>
    </Router>
  );
  }
  else {
   return (
    <Router>
      <div>
        <Nav/>
        {props.errors}
        <UserForm />
      </div>
   </Router>
  );
}

});
